import os
from bs4 import BeautifulSoup
from selenium import webdriver
import cv2

filepath = os.path.abspath("./index.html")

options = webdriver.ChromeOptions()
options.add_argument('--headless')

driver = webdriver.Chrome(r"D:\Program Files\Selenium\chromedriver.exe", chrome_options=options)
driver.get(f"file:///{filepath}")
window_width = driver.execute_script('return document.body.scrollWidth')
window_height = driver.execute_script('return document.body.scrollHeight')
driver.set_window_size(window_width, window_height + 100)
driver.save_screenshot("img/page.png")
image = cv2.imread("img/page.png")
print(f"{image.shape}")

for elem in driver.find_elements_by_class_name("button"):
    # elem.find_element_by_tag_name('p')
    top = int(elem.get_attribute('offsetTop'))
    left = int(elem.get_attribute('offsetLeft'))
    width = int(elem.get_attribute('offsetWidth'))
    height = int(elem.get_attribute('offsetHeight'))
    audio_path = elem.find_element_by_tag_name('audio').get_attribute('src')
    audio_filename = os.path.splitext(os.path.basename(audio_path))[0]
    print(f"{audio_filename}: ({top}, {left}, {width}, {height})")
    cv2.imwrite(f"img/{audio_filename}.png", image[top:top+height, left:left+width])