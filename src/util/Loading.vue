<template>
  <div>
    <p></p>
  </div>
</template>
<script>
export default {
  name: 'ani'
}
</script>

<style lang="scss" scoped>
@import '../style/app';

div {
  @include flexbox();
  @include justify-content(center);
  @include align-items(center);
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background: #000;
  z-index: 1000;
  p {
    width: 2rem;
    height: 2rem;
    animation: loading .8s infinite linear;
  }
}

@keyframes loading {
  0% {
    background: url('../imgs/pageload_icon1.png') no-repeat center center;
    background-size: 80% 80%;
  }
  25% {
    background: url('../imgs/pageload_icon2.png') no-repeat center center;
    background-size: 80% 80%;
  }
  50% {
    background: url('../imgs/pageload_icon3.png') no-repeat center center;
    background-size: 80% 80%;
  }
  75% {
    background: url('../imgs/pageload_icon4.png') no-repeat center center;
    background-size: 80% 80%;
  }
  100% {
    background: url('../imgs/pageload_icon1.png') no-repeat center center;
    background-size: 80% 80%;
  }
}

@-moz-keyframes loading {
  0% {
    background: url('../imgs/pageload_icon1.png') no-repeat center center;
    background-size: 80% 80%;
  }
  25% {
    background: url('../imgs/pageload_icon2.png') no-repeat center center;
    background-size: 80% 80%;
  }
  50% {
    background: url('../imgs/pageload_icon3.png') no-repeat center center;
    background-size: 80% 80%;
  }
  75% {
    background: url('../imgs/pageload_icon4.png') no-repeat center center;
    background-size: 80% 80%;
  }
  100% {
    background: url('../imgs/pageload_icon1.png') no-repeat center center;
    background-size: 80% 80%;
  }
}

@-webkit-keyframes loading {
  0% {
    background: url('../imgs/pageload_icon1.png') no-repeat center center;
    background-size: 80% 80%;
  }
  25% {
    background: url('../imgs/pageload_icon2.png') no-repeat center center;
    background-size: 80% 80%;
  }
  50% {
    background: url('../imgs/pageload_icon3.png') no-repeat center center;
    background-size: 80% 80%;
  }
  75% {
    background: url('../imgs/pageload_icon4.png') no-repeat center center;
    background-size: 80% 80%;
  }
  100% {
    background: url('../imgs/pageload_icon1.png') no-repeat center center;
    background-size: 80% 80%;
  }
}
</style>
