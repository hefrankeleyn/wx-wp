# 可移动容器及可移动区域（一）：学习使用movable-view与movable-area组件

## 一、左滑删除单条消息的功能

利用可移动容器及可移动区域如何实现一个在手机上常见的左滑删除单条消息的功能。

最早 iPhone 手机一代发布的时候，就有了短消息向左滑动删除的功能，后来这个设计慢慢就成为了 App 设计中的一个典范。在微信的聊天消息列表之中，我们看到也有这个功能。

https://developers.weixin.qq.com/miniprogram/dev/component/movable-area.html

## 二、movable-view和movable-area组件

可移动容器指的是 movable-view，可移动区域指的是 movable-area，这两个组件组合起来使用可以实现拖拽功能。

> 在以往的 JavaScript或者是 Flash AS3 开发之中，这个拖拽功能都是开发者手动实现的，现在微信团队直接给出了拖拽组件，主要还是为开发者着想，提供一个低门槛的开箱即用的框架。

其实实现拖拽功能，最好的方案其实还不是使用 movable-view和movable-area 这两个组件实现的。

 movable-view默认是绝对定位，也就是说它的 position 样式等于absolute，因为是绝对定位，所以对它的 top 和 left 属性的设置才会生效。当绝对定位时， top 是相对于它的父容器盒子在 y 轴这个方向上的距离， left 是相对于父容器盒子在 x 轴这个方向的。

## 三、元素的定位

元素的定位，大概讲有两种，相对定位与绝对定位。

相对定位的元素并没有脱离页面的文档流，而绝对定位的元素则脱离了页面的文档流。

相对定位是相对于它原本在页面流中的位置进行定位，而绝对定位是依照于某个参照物进性定位。

绝对定位的参照物有两种，一个是与它相邻的父容器对象，一个是全局的页面对象。

### （1）position样式的五个值

细分下来， position 样式一共有 5 个值：

- 第一个值：relative ，相对定位。相对于元素原本它在页面流中的正常位置进行定位，这种定位不会影响其他元素。举个例子来说， left 等于20，它会向元素的左方向偏移20 个像素。在它的左边，即使有元素它们相互之间有遮挡，布局也不会受到影响。

- 第二个值：absolute， 绝对定位。这个时候元素会被移出文档流，页面并不会为它预留空间，同时它也是今天我们讲的 movable-view position 样式的默认值。

  在这种情况下，元素位置是通过left、top、 right 以及 bottom 的属性相对于 static 定位以外的第一个祖先元素进行定位的。

  在这里有一个问题，为什么要限定 static 定位以外的第一个祖先元素？在这里应该理解为既然是祖先元素，就不一定只是父元素，因为默认的 static 元素没有盒模型可以作为定位的参考， static 元素的left、top、right、 bottom 等属性都是无效的，所以只能网上查找直到找到一个非 static 元素。如果没有找到，则是以页面顶级元素作为参考。在小程序当中，顶级元素就是配置页面本身。在 movable-view 这个组件上，它的 position 一样式默认的就是absolute，而它的父容器movable-area 的 position 样式默认是relative。这样的设定就是为了满足上面那一条非 static 元素的约束。一般我们定义 UI 样式的时候，如果将子元素的样式 position 样式设置为absolute，那么同时也基本会将父容器的 position 样式设置为relative。

- 第三个值：fixed，固定定位。与绝对定位很类似，只是它的参照物不同，绝对定位是相对于相邻的祖先元素进行定位的，那固定定位是相对于页面的顶级元素进行定位，在页面上我们经常会看到回到顶部这样的按钮，它就是使用固定定位实现的。

- 第四个值： sticky， 粘性定位。这个定位可以被认为是相对定位和固定定位的一个混合。元素在跨越特定的阀值之前它是相对定位，之后就是固定定位了。

  ```css
  #word { position: sticky; top: 10px;}
  ```

  举个例子，我们来看一段代码，上面这一行以井号开头的word，这是一个 ID 样式代码， position 等于sticky， top 等于 10px。当向上滚动时，当 word 元素滚动到距离页面视图窗口10px 时，以及小于这个值时，都是使用的是固定定位，元素固定于 10 个像素的地方不动，而其他时间则是相对定位，和其他元素一起在页面流中一起滚动。在设计带字典索引的列表功能时，这个样式很有用，它可以让当前的索引字母在合适的时机一直定位在顶部。具体的关于 sticky 的说明，推荐大家查看这个网址：[关于sticky：https://developer.mozilla.org/zh-CN/docs/Web/CSS/position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)。

- 第五个值， static，静态定位。元素在页面流动的当前位置定位，这个时候它的 top right，bottom， left 以及 z-index 属性设置都是无效的。

## 三、 movable-view与 movable-area 这两个组件的拖拽

关于 movable-view与 movable-area 这两个组件的拖拽的一些情况。

movable-view与 movable-area 的宽高都有一个默认值，默认都是 10px。依据他们本身的大小对比，他们的拖拽一共有三种情况:

- 第一种情况，当两者的大小相等的时候，这个时候是无法移动的。
- 第二种情况，当  movable-view小于movable-area的时候，也就是里边的小于外面的，这个时候 movable-view的移动范围一直包含movable-area，也就是说在任何时候，小的movable-area 都会保持在 movable-view的笼罩之下。

在运行效果上，外面的浅蓝社区域是 movable-view，内部的深蓝社区域是movable-area，无论怎么移动，深色块一直会处于浅蓝色块的范围覆盖之下。接下来我们从源码中看一看运行效果。下面我们看一下这三种拖拽情况。第一种，这是第一种情况，这两个是。

第一种情况：movable-view 和 movable-area 大小一样：

> 这个时候，这个容器无法移动

```
    <view class="page-section">
        <view class="page-section-title">movable-view = movable-area</view>
        <movable-area>
            <movable-view style="width:400rpx;height:400rpx;" direction="all">text</movable-view>
        </movable-area>
    </view>
```

```css
movable-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100rpx;
  width: 100rpx;
  background: #1AAD19;
  color: #fff;
}

movable-area {
  height: 400rpx;
  width: 400rpx;
  background-color: #ccc;
  overflow: hidden;
}
```

第二种情况：movable-view 小于 movable-area 的情况：

```
    <!-- 2 movable-view < movable-area -->
    <view class="page-section">
        <view class="page-section-title">movable-view 小于 movable-area</view>
        <movable-area>
            <movable-view direction="all">text</movable-view>
        </movable-area>
    </view>
```

这个movable-view 它是可以随意拖动的。

第三种情况：movable-view 大于 movable-area

```
  <!-- 片5 3 movable-view > movable-area -->
  <view class="page-section">
    <view class="page-section-title">movable-view 大于 movable-area</view>
    <movable-area style="width:500rpx;height:500rpx;">
      <movable-view class="max" direction="all">text</movable-view>
    </movable-area>
  </view>
```

## 三、如何实现动画

当 animation 这个属性设置为 true 的时候，动态改变属性 x 、y 的值，这样动画就会产生了。我们看一下这个代码里面，比如说这个 animation 等于 true 这个地方， animation 等于true，这是一个动态的绑定，它后面那个包括这个画画里面这些都是可以去掉的，只写一个 emission 属性也是可以的。那再往后面这个 x y 就是我们绑定的这个它的值了，当我们改变这个 x y 的值的时候，这个动画就可以产生。

其中 x 属性定义的是 x 轴方向的偏移量，如果 x 的值不在可移动范围之内，则会自动移动到可移动范围里面去。同理， y 属性定义的是 y 轴方向的偏移量，如果 y 的值不在可移动范围之内，也会自动移动到可移动的范围里面去。

从运行打印的结果来看，当movable-view小于 movable-area的时候，movable-view的 XY 的值是正值，是相对于父容器盒子左上角在右下方向的偏移量。当 movable-view 大于 movable-area 的时候， movable-view 的 XY 的值是负值，是相对于负容器盒子左上角在左上方向上的偏移量。我们注意到因为大小的关系不同， XY 的值也不一样，但一致的是无论是哪种大小的嵌套关系，它们都是从小到大进行变化的。

```
```

## 四、自定义实现左滑删除的效果
