import requests
from bs4 import BeautifulSoup
import string
import json


# SETTING UP A DICTIONNARY TO KNOW THE PAGES AVAILABLE TO EVERY LETTER

#urlinfo = dict.fromkeys(string.ascii_uppercase,0)
# def generate_pagination(urlinfo):
#     for index in urlinfo:
#         print("pages for", index, ":")
#         urlinfo[index: input()
#     print(urlinfo)
#
# => urlinfo

urlinfo = {'A': '42', 'B': '14', 'C': '40', 'D': '23', 'E': '17', 'F': '15', 'G': '14', 'H': '9', 'I': '15', 'J': '2', 'K': '3', 'L': '3',
           'M': '3', 'N': '3', 'O': '3', 'P': '3', 'Q': '2', 'R': '3', 'S': '3', 'T': '3', 'U': '3', 'V': '3', 'W': '1', 'X': '3', 'Y': '1', 'Z': '3'}


# GENERATING THE URL OF EACH PAGE
def url_generator(letter, page):
    main_url = 'https://medicament.ma/listing-des-medicaments/page/'
    onepage_url = 'https://medicament.ma/listing-des-medicaments/?lettre='
    if page == 1:
        return onepage_url+str(letter)
    return main_url+str(page)+'/?lettre='+str(letter)


# LINK ON EVERY PAGE
def make_list(url):
    html_content = requests.get(url).text  # page HTML
    parsed_html = BeautifulSoup(html_content, 'html.parser')
    container = parsed_html.table.find_all('a')
    list = []
    for link in container:
        list.append(link.get('href'))
    return list #list of them links boy

def page_scraper(url):
    html_content = requests.get(url).text  # page HTML
    parsed_html = BeautifulSoup(html_content, 'html.parser')

    name = parsed_html.h3.text

    presentation = parsed_html.find('tr', class_='field-presentation')
    if presentation != None :
        presentation = presentation.find('td',class_='value').text
    else : 
        presentation = 'null'
    

    distributeur = parsed_html.find('tr', class_='field-distributeur')
    if distributeur != None :
        distributeur = distributeur.find('td',class_='value').text
    else : 
        distributeur = 'null'


    composition = parsed_html.find('tr', class_='field-composition')
    if composition != None :
        composition = composition.find('td',class_='value').text
    else : 
        composition = 'null'

    
    famille = parsed_html.find('tr', class_='field-famille')
    if famille != None :
        famille = famille.find('td',class_='value').text
    else : 
        famille = 'null'

    
    statut = parsed_html.find('tr', class_='field-statut')
    if statut != None :
        statut = statut.find('td',class_='value').text
    else : 
        statut = 'null'


    ppv = parsed_html.find('tr', class_='field-ppv')
    if ppv != None :
        ppv = ppv.find('td',class_='value').text
        ppv = int(float(ppv.split()[0].split(",")[0]))
    else : 
        ppv = 'null'


    prix_hospitalier = parsed_html.find('tr', class_='field-prix_hospitalier')
    if prix_hospitalier != None :
        prix_hospitalier = prix_hospitalier.find('td',class_='value').text
        prix_hospitalier = int(float(prix_hospitalier.split()[0].split(",")[0]))
    else : 
        prix_hospitalier = 'null'
    


    indication = parsed_html.find('tr', class_='field-indication')
    if indication != None :
        indication = indication.find('td',class_='value').text
    else : 
        indication = 'null'


    return {
        'name': name,
        'presentation' : presentation,
        'distributeur': distributeur,
        'composition': composition,
        'famille': famille,
        'statut': statut,
        'ppv': ppv,
        'prix_hospitalier': prix_hospitalier,
        'indication': indication
    }


db_content =[]

# for letter in urlinfo :
for letter in urlinfo:
    for page in range (int(urlinfo[letter])):
        print(page + 1)
        url = str(url_generator(letter, page))
        url_array = make_list(url)
        for link in url_array:
            print(str(link))
            db_content.append(page_scraper(link))

open('DB.json','w').write(json.dumps(db_content))