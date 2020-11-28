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
        <div class="col-5">
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
              :max="maxNum"
              v-model="originalWidth"
              @blur="
                originalWidth >= maxNum
                  ? (originalWidth = maxNum)
                  : originalWidth
              "
            ></o-input>
          </o-field>
          <o-field label="Original height (px)">
            <o-input
              type="number"
              placeholder="128"
              size="large"
              step="1"
              min="1"
              :max="maxNum"
              v-model="originalHeight"
              @blur="
                originalHeight >= maxNum
                  ? (originalHeight = maxNum)
                  : originalHeight
              "
            ></o-input>
          </o-field>
          <o-button
            variant="info"
            @click="calculateRatio()"
            :disabled="originalWidth === '' || originalHeight === ''"
          >
            Calculate ratio 👉
          </o-button>
          <o-button variant="primary" inverted disabled v-if="ratio"
            >{{ ratio }} (<i v-if="ratio > 1">Landscape</i
            ><i v-else-if="ratio < 1">Portrait</i
            ><i v-else-if="ratio === 1">Square</i>)</o-button
          >
        </div>
        <div class="col-2">
          <div
            class="ratio hidden-sm"
            :style="{ width: `${calcWidth}px`, height: `${calcHeight}px` }"
            v-if="ratio"
          ></div>
        </div>
        <div class="col-5">
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
                  :max="maxNum"
                  v-model="resizedWidth"
                  :disabled="radio !== 'NewWidth'"
                  @blur="
                    resizedWidth >= maxNum
                      ? (resizedWidth = maxNum)
                      : resizedWidth
                  "
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
                  :max="maxNum"
                  v-model="resizedHeight"
                  :disabled="radio !== 'NewHeight'"
                  @blur="
                    resizedHeight >= maxNum
                      ? (resizedHeight = maxNum)
                      : resizedHeight
                  "
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
      maxNum: 2000,
    }
  },
  computed: {
    calcWidth() {
      return this.ratio > 1 ? 50 : this.ratio < 1 ? 100 : 100
    },
    calcHeight() {
      return this.ratio > 1 ? 200 : this.ratio < 1 ? 30 : 100
    },
  },
  methods: {
    calculateRatio() {
      this.emptyFields('resized')
      if (this.originalWidth !== '' && this.originalHeight !== '') {
        this.ratio = parseFloat(
          (this.originalWidth / this.originalHeight).toFixed(3)
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
  background-color: #e5e5f7;
  background-image: repeating-radial-gradient(
      circle at 0 0,
      transparent 0,
      #e5e5f7 40px
    ),
    repeating-linear-gradient(#d8d8f555, #d8d8f5);
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

.ratio {
  $s: 100px;

  margin: 100% auto 0;
  width: $s;
  height: $s;
  border: 2px dashed #999;
  transition: all 0.3s ease;
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
