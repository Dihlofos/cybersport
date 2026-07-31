# Spec: OrgSection + Faq redesign

Figma node: `56-3332` — две секции в одной: «Организаторы» и «Вопросы и ответы».
Фон: `$darkBlue` (#07151F).

---

## 1. OrgSection (новая)

### Данные → `data/sections/org.json`
```json
{
  "type": "org",
  "title": "Организаторы",
  "text": "Федерация компьютерного спорта Москвы при поддержке Департамента спорта города Москвы",
  "logo": "/images/org/org-logo.svg"
}
```

### Компонент → `app/components/sections/OrgSection.vue`
- Заголовок: Unbounded Regular, 42px, $light, uppercase
- Текст: Tektur Regular, 14px, white, max-width ~433px (как на макете)
- Логотип справа (изображение из Figma)
- Сетка: двухколоночная — текст слева, логотип справа

### Ассеты
- `app/public/images/org/org-logo.svg` ✅ скачан

---

## 2. Faq (изменения стилей)

Существующий компонент `app/components/shared/Faq.vue` и данные `data/sections/faq.json` сохраняются. Меняются **только стили SCSS**.

### Что меняется

| Элемент | Было | Стало (по макету) |
|--------|------|-------------------|
| Заголовок (font-size) | 6.4rem | 4.2rem |
| Заголовок (color) | $white | $light |
| Фон элементов | rgba(0,0,0,0.25) → red gradient | **нет фона** |
| Вопрос (font-family) | Unbounded | Tektur Bold |
| Вопрос (font-size) | 3.8rem | 1.8rem |
| Вопрос (color) | $white | $red |
| Вопрос (text-transform) | uppercase | uppercase (без изменений) |
| Ответ (font-family) | Unbounded | Tektur Regular |
| Ответ (font-size) | 2rem | 1.4rem |
| Разделители | нет | горизонтальная линия между элементами |
| Стрелки | arrow-down.svg / arrow-up.svg | arrow-right.svg / arrow-down-new.svg (из Figma) |
| Декоративные SVG | decor-left / decor-right | **убрать** (в макете их нет) |
| Ширина | полный контейнер | max-width 1160px (центрировано) |

### Ассеты (новые, в `images/faq/`)
- `arrow-right.svg` ✅ скачан — стрелка вправо (свёрнуто)
- `arrow-down-new.svg` ✅ скачан — стрелка вниз (развёрнуто)
- `separator.svg` ✅ скачан — линия-разделитель между элементами

---

## 3. Изменения в `index.vue`

Добавить OrgSection перед Faq:

```diff
+ import orgData from '~/../data/sections/org.json'
...
+ <OrgSection v-bind="orgData" />
  <Faq v-bind="faqData" />
```

---

## 4. Файлы

| Файл | Действие |
|------|----------|
| `data/sections/org.json` | **Создать** |
| `app/components/sections/OrgSection.vue` | **Создать** |
| `app/components/shared/Faq.vue` | **Изменить** (только SCSS + template стрелок/разделителей) |
| `app/pages/index.vue` | **Изменить** (добавить OrgSection) |
| `app/public/images/org/org-logo.svg` | **Создан** |
| `app/public/images/faq/arrow-right.svg` | **Создан** |
| `app/public/images/faq/arrow-down-new.svg` | **Создан** |
| `app/public/images/faq/separator.svg` | **Создан** |

---

## 5. DoD
- [ ] OrgSection рендерит заголовок, текст и логотип как в макете
- [ ] Faq выглядит как в макете: правильные шрифты, цвета, стрелки, разделители
- [ ] Аккордеон работает (открытие/закрытие)
- [ ] Мобильная адаптация обеих секций
- [ ] Код проходит `/code-review`
