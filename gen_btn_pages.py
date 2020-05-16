import os
from bs4 import BeautifulSoup
from selenium import webdriver
import cv2

filepath = os.path.abspath("./index.html")

options = webdriver.ChromeOptions()
options.add_argument('--headless')

driver = webdriver.Chrome(r"D:\Program Files\Selenium\chromedriver.exe", chrome_options=options)
driver.implicitly_wait(5)
driver.get(f"file:///{filepath}")
window_width = driver.execute_script('return document.body.scrollWidth')
window_height = driver.execute_script('return document.body.scrollHeight')
driver.set_window_size(window_width, window_height + 100)
driver.save_screenshot("img/page.png")
image = cv2.imread("img/page.png")
crop_area = image.copy()
print(f"{image.shape}")

container = driver.find_element_by_class_name("container")
anchor_top = int(container.get_attribute('offsetTop'))
anchor_left = int(container.get_attribute('offsetLeft'))
print(f"anchor: ({anchor_top}, {anchor_left})")

for elem in driver.find_elements_by_class_name("button"):
    # elem.find_element_by_tag_name('p')
    top = anchor_top + int(elem.get_attribute('offsetTop'))
    left = anchor_left + int(elem.get_attribute('offsetLeft'))
    width = int(elem.get_attribute('offsetWidth'))
    height = int(elem.get_attribute('offsetHeight'))
    audio_path = elem.find_element_by_tag_name('audio').get_attribute('src')
    audio_filename = os.path.splitext(os.path.basename(audio_path))[0]
    print(f"{audio_filename}: ({top}, {left}, {width}, {height})")
    crop_area = cv2.rectangle(crop_area, (left, top), (left+width, top+height), (0, 0, 255), 2)
    cv2.imwrite(f"img/btns/{audio_filename}.png", image[top:top+height, left:left+width])

    # c = elem.get_attribute('class')
    # voice_type = 0
    # if 'basic' in c: voice_type = 0
    # elif 'reply' in c: voice_type = 1
    # elif 'longer' in c: voice_type = 3
    # elif 'special' in c: voice_type = 4
    # else: voice_type = 2
    # dispname = elem.text.replace("\n", "\\n")
    # print(f'{{ "dispname": "{dispname}", "filename": "{os.path.basename(audio_path)}", "type": "{voice_type}" }},')

cv2.imwrite("img/crop.png", crop_area)