# view容器组件及Flex布局

[toc]



## 一、链接

[view容器组件：https://developers.weixin.qq.com/miniprogram/dev/component/view.html](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)。

思考：

在苹果系统中有一个重要的功能设计：在 HTML5 网页上单击链接或者按钮，会明显感觉到有一个卡顿，有 300 毫秒的延迟。

而小程序里的单机事件没有 300 毫秒的延迟。

## 二、什么是容器组件

所谓容器组件，就像 HTMI 5 里面的 DIV 标签一样，是为容纳其他组件而存在的，它本身也可以有些自己的样式，但它最主要的功能是布局这个容器组件。

view 是最基础的，也是微小程序第一个公布的容器组件。

## 三、view容器组件的属性

- `hover-class`  指定按下去的样式类,让容器有一个单击效果。当 `hover-class="none"` 时，或者没有设置这个属性时，没有点击态效果。

  单击再松开手指以后，容器组件恢复之间的状态。
  
  ```html
  <view hover-class="bc_red" class="section_title"></view>
  ```
  
  示例：
  
  ```
    <!-- 2 示例 -->
  <view class="section">
  	<view class="gap">2 示例</view>
  	<view hover-class="bc_red" class="section__title">content</view>
  </view>
  
  /* 2 */
  .bc_red {
    background: red;
    width: 100px;
    height: 120px;
  }
  ```
  
  `hover-class` 这个属性名称有一定的迷惑性。在 h t m l 开发中， mousehover 事件指的是鼠标悬停事件，honver有悬停的意思， mousedown 才是鼠标按下去的事件。在 Flash Action Script3.0 开发中，鼠标按下去显示的帧也是 mousedown 这一帧。
  
- `hover-stop-propagation`  指定是否阻止本节点的祖先节点出现点击态，默认为 false 不阻止。从示例代码可以看到，有两个 view 容器，里边那个子容器使用了 hover stop propagation 属性，由于它是一个布尔属性，只要写上属性名字，不填写属性值也是可以的，也代表真。如果写属性值的话，还要使用布尔值绑定，直接写一个字符串 true 是不行的。

  ```
  <view class="section">
  	<view class="gap">3 示例</view>
  	<!-- 阻止父节点出现hover状态 -->
  	<view hover-class="bc_red" class="section__title">
  		parent
  		<view hover-stop-propagation hover-class="bc_green" class="section__title">
  			child view
  		</view>
  	</view>
  </view>
  ```

  ` hover-stop-propagation` 这个属性的迷惑性，官方文档指定是否阻止本节点的祖先节点出现点击态。这个描述是很专业的，虽然是单基态，但并不能理解为是  `press-stop-propagation` 或者 `click-stoppropagation`，虽然它是这个意思。现在我们通过跟踪父子组件的 tap事件，验证一下 `hover-stop-propagation` 这个属性的作用。

  ```
  <view class="section">
  	<view class="gap">4 示例 事件三阶段</view>
  	<!-- 阻止父节点出现hover状态 -->
  	<view id="parentView" bindtap="onTap" hover-class="bc_red" class="section__title">
  		parent
  		<view id="childView" bindtap="onTap" hover-stop-propagation hover-class="bc_green" class="section__title">
  			child view
  		</view>
  	</view>
  </view>
  ```

  ```javascript
  // 片 4
  onTap(e){
      console.log(e.target)
    }
  ```

  在示例中，我们给两个view，一对儿父子容器同时绑定 tap事件，为方便追踪，为父子容器都分配了ID，父容器 ID 是 parentview，子容器是 childview。单击一次，父容器输出一次，但单击一次，子容器却输出两次，那为什么会输出两次？为什么会触发两次的 tap事件？

  这是因为**每个事件它都有捕捉、目标与冒泡三个阶段**。在 Vue 视图容器上使用bind绑定的事件，默认会在目标与冒泡这两个阶段派发事件。

  子组件的冒泡事件默认会向上传递。` hover-stop-propagation` 这个属性就是为了阻止父组件出现 hover-class 样式，但是它还不能阻止冒泡事件向上传递。当设置这个属性以后，这时候我们点击子组件仍然是可以看到两次输出的。

  那么我们可以让子容器 view 的 type 事件只派发一次吗？

  可以使用 catch 绑定事件函数， catch 与 bind 的作用相同，与 bind 的不同的是 catch 会阻止事件向上冒泡。

  catch是在事件的捕捉阶段监听事件的。将bindtap 改为了 catchtap，这样单击子容器组件的时候便不会输出两次了。

  ```html
  <!-- 5 子组件只输出一次-->
  <view class="section">
  	<view class="gap">5 示例</view>
  	<!-- 阻止父节点出现hover状态，阻止冒泡 -->
  	<view id="parentView" bindtap="onTap" hover-class="bc_red" class="section__title">
  		parent
  		<view id="childView" catchtap="onTap" hover-stop-propagation hover-class="bc_green" class="section__title">
  			child view
  		</view>
  	</view>
  </view>
  ```

  

-  `hover-start-time`， 按住后多久出现点击态，单位毫秒

- `hover-stay-time` 手指松开后点击态保留时间，单位毫秒。

  没有特殊说明，微信小程序里面所有属性的时间单位都是毫秒。这两个属性的设置说明在 view 容器组件内部有代码，肯定做了掐表，做了定时。当 touchstart 事件发生时，开始计时，到达hover-start-time时，应用 hover-class 样式。当 touchstart 事件结束，即 touchend 的事件发生时， 开始hover-stay-time的倒计时，时间到则移除  hover-class 样式。

  设置hover-start-time属性是为了方便开发者控制 hover-class 样式出现的时机。在测试中我们发现但凡在 view 上单击一下，很正常的一个速度，单击不需要悬停也会出现 hover-class 样式的应用。50 毫秒是它的一个默认时间，这是一个极短的时间，但是在计算机的这个微观时间里面，这也是一个极长的时间，这个时间已经足以包括一次系统单机事件了。单机事件不是一个点事件，它是一个跨度一定时间段的物理事件。我们以mac系统为例，系统设置里面有一个地方可以改变单机事件的跟踪速度，改变这个跟踪速度以后，在微信开发者工具里面，模拟器里面的 APP 事件也会受到影响。如果我们把跟踪输入调整到快的一侧，单击时只是轻轻慢慢的一点按，那么系统是不会触发单机事件的。

当延迟超过 100 毫秒的时候，用户就会感觉到界面有明显的卡顿，但是在移动设备上，特别是苹果的 Safari 浏览器上，我们不得不忍受 300 毫秒的延迟，这是为什么呢？苹果创始人乔布斯在 2007 年 iPhone 发布会上演示过这样一个功能，对于一个 Safari 浏览器网页在内容区快速单击，苹果会帮助我们准确定位到文章的主体内容，并将其放大。那这个功能很酷，但是它是有代价的。如果用户不小心在双击时接到了一个链接，这样软件怎么去处理？是马上跳转还是等待用户的另外一次单击？不然他没有办法判断是不是双击事件。

苹果采用的是第二种方式，所有的 Safari 中的链接都要延迟300毫秒，用这种方式观察用户是不是还要发出第二次单机事件。如果没有再跳转这个链接，这导致苹果手机中的 HTML 网页里面的单机反应都有一点迟钝。但是在微信小程序里没有这个问题。  `hover-start-time`默认时间是 50 毫秒，只需要 50 毫秒甚至更短的时间就可以触发单击事件。微信小程序已经迈过了 300 毫秒的延迟的限制。如果有人问你，使用微信小程序开发产品，相比 html5 开发有什么优势？没有单击延迟，这就是在体验上一个很大的优势。

## 四、思考

`hover-start-time`这个属性的值，它的默认值是 50 毫秒，那么最小它可以设置为多少？设置为 1 毫秒可以吗？为什么？

## 五、 `hover-class`属性的应用

我们可以基于 `hover-class`这个属性实现按钮，示例中三个按钮均是基于 button 组件改造的， button 是一个组件，同时实际上它也是一个容器，所以可以把 button 当成 view 来使用。在 button 上面也可以应用`hover-class`属性，虽然它的属性文档里面没有标明，但是也可以这样去用。

```
    <!-- 8 -->
    <view class="section">
        <view class="gap">8 按钮示例</view>
        <!-- 普通按钮 -->
        <view class="section">
            <button class="btn" type="primary">完成</button>
        </view>
        <!-- 圆形按钮 -->
        <view class="section">
            <button hover-class="circle-btn__hover_btn">
                <icon type="success" size="80px"></icon>
            </button>
        </view>
        <!-- 距形按钮 -->
        <view class="section">
            <button type="default" class="btn" plain hover-class="rect-btn__hover_btn">
                <icon type="success_no_circle" size="26px"></icon>
                完成
            </button>
        </view>
    </view>
```

```css
/* 8 */
.btn{
  display: flex;
  align-items: middle;
  padding: 8px 50px 8px;
  border: 1px solid #b2b2b2;
  background-color: #f2f2f2;
  width:auto;
}
/* 圆角按钮 */
.circle-btn__hover_btn {
  opacity: 0.8;
  transform: scale(0.95, 0.95);
}
/* 方框按钮 */
.rect-btn__hover_btn {
  position: relative;
  top: 3rpx;
  left: 3rpx;
  box-shadow: 0px 0px 8px rgba(175, 175, 175, .2) inset;
}
```

这三个按钮主要实现了三个 `hover-class`样式：

第一个样式，`.btn` 是普通的自定义按钮样式， flex与 align-items 是为了实现文本与图标的横向对齐，这是 flex 布局方面的内容，稍后我们会有详细的介绍。`#b2b2b2`这个颜色值是符合微信设计规范的，按钮边框色。`#f2f2f2`是按钮的背景色。

第二个样式， transform 是圆形按钮在单击时缩小 0.05，按钮单击式微微缩小。这是从 Flash 交互时代传承下来的体验技巧，包括 0.05 这个数值也是在交互中在当时也是经常使用的。

第三个样式， `#b2b2b2`颜色值作为边框色，以它的 RGBA 格式的 20% 透明格式，将它作为方形按钮，按一下时状态的内阴影颜色，这也是符合微信颜色设计规范的。 `box-shadow` 这个样式用于定义组件的内阴影。

## 五、作业

 `hover-start-time`，这个属性的值最小可以设置为多少？设置为 1 毫秒可以吗？为什么？

