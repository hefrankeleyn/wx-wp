# 组件-movable-area和movable-view

[toc]

## 一、可移动容器和可移动区域

- `movable-view` 可移动容器

  默认是绝对定位，它的`position`样式值默认为`absolute`

- `movalbe-area` 可移动区域

这两个容器组合使用可实现拖拽功能，它的`position`样式值默认为`relative`

## 二、元素的定位

- `static`  静态定位

- `relative`  相对定位

- `absolute  绝对定位`

- `fixed`  固定定位

- `sticky`  粘性定位

  相对定位和固定定位的混合，元素在跨越特定的阀值之前它是相对定位，之后就是固定定位。

CSS（层叠样式表）中的定位是一种用于控制元素在网页上的位置的技术。CSS 提供了不同类型的定位属性，用于精确地放置和定位元素。以下是常见的 CSS 定位属性：

1. 静态定位（Static Positioning）：
   - `position: static;` 是元素默认的定位属性，元素按照文档流中的顺序排列，不受 top、right、bottom 和 left 属性的影响。

2. 相对定位（Relative Positioning）：
   - `position: relative;` 允许你使用 top、right、bottom 和 left 属性相对于元素在文档流中的原始位置进行微调。元素仍占据文档流中的空间。

3. 绝对定位（Absolute Positioning）：
   - `position: absolute;` 让元素相对于最近的具有相对或绝对定位的父元素进行定位。如果没有这样的父元素，元素将相对于文档的根元素 `<html>` 定位。绝对定位的元素不再占据文档流中的空间。

4. 固定定位（Fixed Positioning）：
   - `position: fixed;` 让元素相对于浏览器窗口进行定位，元素会固定在页面上，无论滚动页面时，它都会保持在同一位置。通常用于创建固定的导航栏或工具栏。

5. 粘性定位（Sticky Positioning）：
   - `position: sticky;` 是一种混合定位，元素会在特定滚动位置变为固定定位，然后继续随滚动而滚动，直到到达另一个特定位置，然后它将变为相对定位。这通常用于创建页面上的粘性元素，例如粘性导航。

使用这些定位属性，你可以在网页上创建复杂的布局和定位效果。通常，你还需要配合 `top`、`right`、`bottom` 和 `left` 属性来精确控制元素的位置。要实现某种效果，你可能需要结合使用不同的定位属性和属性值，以达到所需的效果。

粘性定位的行为规则：

粘性定位（`position: sticky;`）是一种在网页设计中用于实现元素在滚动时切换定位的技术。它的行为规则如下：

1. **初始状态（Initial State）**：元素在页面加载时处于常规文档流中，按照文档流中的顺序排列。在初始状态下，粘性元素不会随滚动而移动。

2. **粘性状态（Sticky State）**：当页面滚动到粘性元素的位置时，根据指定的 `top`、`right`、`bottom` 或 `left` 属性值，元素将切换为粘性定位。它将保持在指定位置，直到特定条件触发。

3. **结束状态（End State）**：粘性元素会继续保持在粘性状态，直到特定条件触发，通常是当它的底部边界滚出了包含块（可以是父元素或根元素）的边界时。这时，它将再次切换为常规文档流中的位置。

要注意以下几点：

- 包含块：粘性元素的行为是相对于包含块的边界进行的。包含块可以是最近的具有滚动机制（通常是有滚动条的容器）的祖先元素，或者如果没有这样的祖先元素，它将相对于文档的根元素（`<html>`）进行定位。

- 指定位置：`top`、`right`、`bottom` 和 `left` 属性用于指定元素切换到粘性状态的位置。当页面滚动到达这个位置时，元素会切换为粘性定位。

- 效果：粘性定位通常用于创建固定导航栏、悬浮侧边栏或其他需要在滚动时保持在页面上的元素。这使得用户可以方便地导航或查看相关内容。

总之，粘性定位允许元素在页面滚动时切换其定位属性，提供了一种有用的方式来改善用户体验并增加页面的交互性。

示例：

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
    }

    .container {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
    }

    .sticky-title {
      position: -webkit-sticky;
      position: sticky;
      top: 0; /* 在页面顶部切换为粘性定位 */
      background-color: #3498db;
      color: #fff;
      padding: 10px;
      text-align: center;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      padding: 8px;
    }
  </style>
</head>
<body>
  <h1>按字母顺序排列的列表</h1>
  <div class="container">
    <div class="sticky-title">A</div>
    <ul>
      <li><a href="#">Apple</a></li>
      <!-- ... 更多项目以字母顺序排列 ... -->
    </ul>
  </div>
  <div class="container">
    <div class="sticky-title">B</div>
    <ul>
      <li><a href="#">Banana</a></li>
      <!-- ... 更多项目以字母顺序排列 ... -->
    </ul>
  </div>
  <div class="container">
    <div class="sticky-title">C</div>
    <ul>
      <li><a href="#">Cherry</a></li>
      <!-- ... 更多项目以字母顺序排列 ... -->
    </ul>
  </div>
</body>
</html>
```

在上面示例中：

1. 随着页面滚动，`.sticky-title` 也随着滚动，直到距离顶部100px的时候，变成固定定位；
2. 当一个`.container`滚出浏览器窗口，`.sticky-title` 再次变为相对定位，随着`.sticky-title`一起消失；



