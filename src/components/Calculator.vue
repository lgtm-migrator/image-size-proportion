<template>
  <section class="box-calculator">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="title">
            Image Size Proportion Calculator
            <small class="version">v. {{ version }}</small>
          </h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h3>
            1️⃣ Input original sizes:
            <o-button
              variant="warning"
              @click="emptyFields('original')"
              class="float-right"
              :disabled="originalWidth === '' || originalHeight === ''"
              size="small"
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
            ></o-input>
          </o-field>
          <o-button
            variant="info"
            @click="calculateRatio()"
            :disabled="originalWidth === '' || originalHeight === ''"
          >
            Calculate Ratio 👉
          </o-button>
          <o-button variant="primary" inverted disabled v-if="ratio">{{
            ratio
          }}</o-button>
        </div>
        <div class="col-6">
          <h3>
            2️⃣ Select one to get size proportion:
            <o-button
              variant="warning"
              @click="emptyFields('resized')"
              class="float-right"
              :disabled="resizedWidth === '' || resizedHeight === ''"
              size="small"
              >Clear</o-button
            >
          </h3>
          <div class="row -no-margin">
            <div class="col-1">
              <o-tooltip label="Select to edit" position="left" variant="info">
                <o-radio
                  v-model="radio"
                  native-value="NewWidth"
                  @change.native="resizedHeight = ''"
                  :disabled="ratio === ''"
                  variant="info"
                />
              </o-tooltip>
            </div>
            <div class="col-10">
              <o-field label="New width (px)">
                <o-input
                  type="number"
                  placeholder="320"
                  size="large"
                  step="1"
                  min="1"
                  v-model="resizedWidth"
                  :disabled="radio !== 'NewWidth'"
                ></o-input>
              </o-field>
            </div>
          </div>
          <div class="row">
            <div class="col-1">
              <o-tooltip label="Select to edit" position="left" variant="info">
                <o-radio
                  v-model="radio"
                  native-value="NewHeight"
                  @change.native="resizedWidth = ''"
                  :disabled="ratio === ''"
                  variant="info"
                />
              </o-tooltip>
            </div>
            <div class="col-10">
              <o-field label="New height (px)">
                <o-input
                  type="number"
                  placeholder="80"
                  size="large"
                  step="1"
                  min="1"
                  v-model="resizedHeight"
                  :disabled="radio !== 'NewHeight'"
                ></o-input>
              </o-field>
              <o-button
                variant="success"
                @click="calculateProportion(radio)"
                :disabled="resizedWidth === '' && resizedHeight === ''"
              >
                Get proportional value 🌟
              </o-button>
            </div>
          </div>
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
      ratio: '',
      resizedWidth: '',
      resizedHeight: '',
      radio: '',
    }
  },
  methods: {
    calculateRatio() {
      this.emptyFields('resized')
      if (this.originalWidth !== '' && this.originalHeight !== '') {
        this.ratio = parseFloat(
          (this.originalWidth / this.originalHeight).toFixed(2)
        )
      }
    },
    calculateProportion(field) {
      if (field === 'NewWidth') {
        this.resizedHeight = Math.round(this.resizedWidth / this.ratio)
      } else if (field === 'NewHeight') {
        this.resizedWidth = Math.round(this.resizedHeight * this.ratio)
      }
    },
    emptyFields(type) {
      if (type === 'original') {
        this.originalHeight = this.originalWidth = this.resizedHeight = this.resizedWidth = this.radio = this.ratio =
          ''
      } else if (type === 'resized') {
        this.resizedHeight = this.resizedWidth = this.radio = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.box-calculator {
  padding: 2rem 0;
  min-height: calc(100vh - 46px);
  background-color: #eee;
}
.title {
  margin: 0 0 2rem;
  border-bottom: 2px solid #fff;
  text-align: center;

  .version {
    font-weight: 300;
    font-style: italic;
    font-size: 0.6em;
  }
}
</style>

<style lang="scss">
.row.-no-margin [class^='col'] {
  margin-top: 0;
  margin-bottom: 0;
}
.o-control-input {
  input {
    border-color: #363636;

    &::placeholder {
      color: #dbdbdb;
    }
    &:disabled {
      border-color: #dbdbdb;
    }
  }
}

.o-radio {
  transform: translateY(20%);

  &.o-radio-disabled:hover {
    cursor: not-allowed;
  }
}
</style>
