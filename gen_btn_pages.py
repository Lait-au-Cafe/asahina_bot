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

btn_page_tmpl = """
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <title>朝比奈非公式bot（美夜ボタン）</title>

  <!-- OG -->
  <meta name="twitter:card" content="summary"/>
  <meta name="twitter:image" content="https://lait-au-cafe.github.io/asahina_bot/img/btns/{btn_name}.png"/>
  <meta name="og:url" content="https://lait-au-cafe.github.io/asahina_bot/"/>
  <meta name="og:title" content="朝比奈非公式bot（美夜ボタン）"/>
  <meta name="og:description" content="このサイトはVTuber朝比奈美夜さんのファンサイトです．Twitchの配信からの切り抜き及び朝比奈さんから直接いただいた素材を利用しています．"/>
  <meta name="og:image:secure_url" content="https://lait-au-cafe.github.io/asahina_bot/img/btns/{btn_name}.png"/>
  <meta name="og:image:type" content="image/png"/>
</head>
<body>
    <p>このページはTwitterシェア用のダミーページです．</p>
    <p>通常は本体ページに自動で遷移するようになっています．</p>
    <p>何らかの原因で遷移しない場合はこちらのリンクから手動で遷移をお願いします．</p>
    <p><a href="https://lait-au-cafe.github.io/asahina_bot/">https://lait-au-cafe.github.io/asahina_bot/</a></p>
    <p>いや本当はこんなページ作らずにPHPとか使ってmetaタグ書き分けたほうがいいんだけどね？</p>
    <p>でもgithub pagesはPHP使えないし，鯖立てるのも管理めんどいし正直勘弁してほしい．マジで．</p>
    <script>
        window.location.href = "https://lait-au-cafe.github.io/asahina_bot/";
    </script>
</body>
</html>
"""

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

    with open(f"btn_pages/{audio_filename}.html", mode='w', encoding='utf-8') as btn_page:
        btn_page.write(btn_page_tmpl.format(btn_name=audio_filename))

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