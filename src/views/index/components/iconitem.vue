<script>


export default {
  name: 'IconItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []
    if (icon) {
      let  str=`iconfont icon-${icon}`;
      vnodes.push(<i class={str}></i>)
    }
    if (title) {
      vnodes.push(<span slot='title' class="menu-title">{ (title)}</span>)
    }
    return vnodes
  }
}
</script>
<style lang="scss">
.closed_nav .menu-title{
   display: none !important;
}

</style>
