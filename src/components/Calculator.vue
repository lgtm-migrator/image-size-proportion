<template>
  <section class="box-calculator">
    <h1 class="title">
      Image Size Proportion Calculator
      <small class="version">v. {{ version }}</small>
    </h1>
    <div class="container">
      <div class="row">
        <div class="col-5">
          <h3>
            Original size:
            <o-button
              variant="primary"
              @click="emptyOriginalSizes()"
              class="float-right"
              >Clear</o-button
            >
          </h3>
          <o-field label="Original width (px)">
            <o-input
              type="number"
              placeholder="512"
              size="large"
              step="1"
              min="1"
              v-model="originalWidth"
              :blur="calculateProportion()"
            ></o-input>
          </o-field>
          <o-field label="Original height (px)">
            <o-input
              type="number"
              placeholder="128"
              size="large"
              step="1"
              min="1"
              v-model="originalHeight"
              :blur="calculateProportion()"
            ></o-input>
          </o-field>
        </div>
        <div class="col-2">
          <img src="https://icongr.am/clarity/play.svg?size=64&color=cccccc" />
        </div>
        <div class="col-5">
          <h3>
            Proportional resize:
            <o-button
              variant="primary"
              @click="emptyResizedSizes()"
              class="float-right"
              >Clear</o-button
            >
          </h3>
          <o-radio v-model="radio" native-value="default" />
          <o-field label="Original width (px)">
            <o-input
              type="number"
              placeholder="512"
              size="large"
              step="1"
              min="1"
              v-model="resizedWidth"
              :blur="calculateProportion()"
            ></o-input>
          </o-field>
          <o-radio v-model="radio" native-value="default" />
          <o-field label="Original height (px)">
            <o-input
              type="number"
              placeholder="128"
              size="large"
              step="1"
              min="1"
              v-model="resizedHeight"
              :blur="calculateProportion()"
            ></o-input>
          </o-field>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      version: process.env.VUE_APP_VERSION,
      originalWidth: '',
      originalHeight: '',
      radio: '',
      resizedWidth: '',
      resizedHeight: '',
      ratio: '',
    }
  },
  methods: {
    calculateProportion() {
      if (this.originalWidth !== '' && this.originalHeight !== '') {
        this.ratio = this.originalWidth / this.originalHeight
        console.log('ratio', this.ratio)
      }
      if (this.resizedWidth !== '') {
        this.resizedHeight = Math.round(this.resizedWidth / this.ratio)
      }
      if (this.resizedHeight !== '') {
        this.resizedWidth = Math.round(this.resizedHeight * this.ratio)
      }
    },
    emptyOriginalSizes() {
      this.originalHeight = this.originalWidth = this.resizedHeight = this.resizedWidth =
        ''
    },
    emptyResizedSizes() {
      this.resizedHeight = this.resizedWidth = ''
    },
  },
}
</script>

<style scoped lang="scss">
.box-calculator {
  padding-bottom: 3rem;
}
.title {
  margin: 40px 0;
  text-align: center;

  .version {
    font-weight: 300;
    font-style: italic;
    font-size: 0.6em;
  }
}
</style>
