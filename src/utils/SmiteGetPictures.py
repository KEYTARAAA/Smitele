import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def remove_scale_to_width_down(string):
    # Find the index of "scale-to-width-down"
    index = string.find("scale-to-width-down")
    
    # If "scale-to-width-down" is found, remove it along with everything after it
    if index != -1:
        string = string[:index]
    
    return string

def download_images(url, folder_path):
    # Send a GET request to the URL
    response = requests.get(url)
    image_base_start = 'https://static.wikia.nocookie.net/smite_gamepedia/images/5/5a/T_'
    image_base_end = '_Default_Icon.png/revision/latest'

    with open('../static/Gods_List_Text.txt', 'r', encoding='utf-8') as file:
        html = file.read()
        # Parse the HTML content
        soup = BeautifulSoup(html, 'html.parser')
        table = soup.find_all('table', class_='blue-window sortable jquery-tablesorter')

        rows = table[0].find_all('tr')
        
        # Skip the header row (first row)
        for row in rows[1:]:
            # Extract god name from the title attribute of the <a> tag
            god_name = row.find('a')['title']
            #remove_scale_to_width_down(img_url = row.find('img')['src'])
            img_url = remove_scale_to_width_down(row.find('img')['src'])
            img_name = god_name
            with open(os.path.join(folder_path, img_name+'.png'), 'wb') as f:
                img_data = requests.get(img_url).content
                f.write(img_data)
            
            print(f"Downloaded: {img_name} from {img_url}")
        
def get_html_content(url):
    # Set up the Chrome WebDriver
    chrome_service = Service('C:/webdrivers/chrome.exe')  # Replace 'path/to/chromedriver' with the actual path to chromedriver
    driver = webdriver.Chrome(service=chrome_service)
    
    # Open the URL in the browser
    driver.get(url)
    
    # Wait for all images to load
    WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.TAG_NAME, 'img')))
    
    # Get the HTML content after all images have loaded
    html_content = driver.page_source
    
    # Close the WebDriver
    driver.quit()
    
    return html_content
# Example usage
url = "https://smite.fandom.com/wiki/List_of_gods"  # Replace with your URL
folder_path = "images"  # Replace with the folder path where you want to save images
download_images(url, folder_path)
