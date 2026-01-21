# Analytics Events Documentation

## Отслеживаемые события

### 1. Buy Button Clicks (Клики на кнопки покупки)
**Event Name:** `buy_button_click`

**Параметры:**
- `button_text` - текст кнопки (например, "Buy Full Tour - $7")
- `guide_name` - название гида (например, "Sex and the City Manhattan Walk")
- `button_location` - местоположение кнопки ("guide_section" или "hero_section")

**Где отслеживается:**
- Все кнопки с классом `.btn-buy`
- Все кнопки с классом `.btn-primary` (кнопки "Buy Guide - $7" в Hero секции)

---

### 2. Download Button Clicks (Клики на кнопки загрузки)
**Event Name:** `download_button_click`

**Параметры:**
- `button_text` - текст кнопки (например, "Download App")
- `button_location` - местоположение ("navbar", "hero", "cta_section")

**Где отслеживается:**
- Все кнопки с классом `.btn-download`
- Все кнопки с классом `.btn-primary-small` (кнопка "Download App" в навигации)

---

### 3. Navigation Clicks (Клики по навигации)
**Event Name:** `navigation_click`

**Параметры:**
- `link_text` - текст ссылки
- `link_href` - href атрибут ссылки

**Где отслеживается:**
- Все ссылки в навигационном меню (`.nav-links a`)

---

### 4. Audio Player Events (События аудиоплеера)

#### Play
**Event Name:** `audio_play`

**Параметры:**
- `guide_name` - название гида
- `audio_src` - путь к аудиофайлу

#### Pause
**Event Name:** `audio_pause`

**Параметры:**
- `guide_name` - название гида
- `current_time` - текущее время воспроизведения (в секундах)

#### Complete
**Event Name:** `audio_complete`

**Параметры:**
- `guide_name` - название гида

---

### 5. Story Card Clicks (Клики по карточкам историй)
**Event Name:** `story_card_click`

**Параметры:**
- `story_name` - название истории (например, "Sex and the City")
- `link_href` - ссылка на секцию

**Где отслеживается:**
- Карточки историй в Hero секции (`.story-title-card`)

---

### 6. Carousel Interactions (Взаимодействие с каруселью)
**Event Name:** `carousel_interaction`

**Параметры:**
- `action` - действие ("previous", "next", "dot_click")
- `carousel_type` - тип карусели ("app_screenshots" или "reviews")
- `slide_index` / `review_index` - индекс слайда (для dot_click)

**Где отслеживается:**
- Карусель скриншотов приложения
- Карусель отзывов

---

### 7. Check Guides Button (Кнопка "Посмотреть гиды")
**Event Name:** `check_guides_click`

**Параметры:**
- `button_text` - текст кнопки
- `trigger` - источник ("scroll_to_demo" или прямой клик)

**Где отслеживается:**
- Кнопки с классом `.btn-secondary`
- Функция `scrollToDemo()`

---

### 8. Buy Guide Scroll (Скролл к секции покупки)
**Event Name:** `buy_guide_scroll_click`

**Параметры:**
- `button_text` - "Buy Guide - $7"
- `trigger` - "scroll_to_cta"

**Где отслеживается:**
- Функция `scrollToCTA()`

---

### 9. Footer Links (Ссылки в футере)
**Event Name:** `footer_link_click`

**Параметры:**
- `link_text` - текст ссылки
- `link_href` - href атрибут

**Где отслеживается:**
- Все ссылки в футере (`.footer a`)

---

### 10. Page View (Просмотр страницы)
**Event Name:** `page_view`

**Параметры:**
- `page_title` - заголовок страницы
- `page_location` - URL страницы

**Где отслеживается:**
- Автоматически при загрузке страницы

---

## Как проверить события

### В консоли браузера:
Все события логируются в консоль:
```
GA Event: buy_button_click {button_text: "Buy Full Tour - $7", guide_name: "...", ...}
Clarity Event: buy_button_click {...}
```

### В Google Analytics:
1. Перейдите в **Realtime** → **Events**
2. Взаимодействуйте с сайтом
3. События должны появиться в реальном времени

### В Microsoft Clarity:
1. Откройте Dashboard проекта
2. Перейдите в **Recordings**
3. В записях сессий вы увидите кастомные теги с событиями
4. Также можно использовать фильтр по custom tags

---

## Техническая информация

**Функции трекинга:**
- `trackEvent(eventName, eventParams)` - основная функция отправки событий
- Автоматически отправляет события в Google Analytics (gtag) и Clarity
- Все события логируются в консоль для отладки

**Требования:**
- Google Analytics должен быть загружен (gtag.js)
- Microsoft Clarity должен быть загружен (clarity script)
- Оба скрипта уже подключены в `index.html`
