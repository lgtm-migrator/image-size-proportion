<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-12">
          &copy; Copyleft 2020 // Jorge Epuñan
          <a href="https://github.com/juanbrujo/image-size-proportion">
            <img
              src="https://icongr.am/simple/github.svg?size=20&color=dddddd&colored=false"
              class="icon"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss">
.footer {
  padding: 0.2rem 0;
  color: #ddd;
  background-color: #333447;

  .icon {
    margin-left: 5px;
    margin-bottom: -4px;
    float: right;
  }
}
</style>
