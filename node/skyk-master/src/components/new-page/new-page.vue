<template>
  <div>
    <div v-if="marks == 0">
      <skyk-d></skyk-d>
    </div>
    <div v-else-if="marks == 2">
      <skyk-apartment nameimg="户型"></skyk-apartment>
    </div>
    <div v-else-if="marks == 4">
      <skyk-location></skyk-location>
    </div>
    <div v-else-if="marks == 5">
      <skyk-room></skyk-room>
    </div>
    <div v-else>
      <skyk-room :nameimg="name"></skyk-room>
    </div>
    <!--
    <div v-if="marks == 10">
        <skyk-room nameimg="视频"></skyk-room>
    </div>
    <div v-if="marks == 3">
        <skyk-room nameimg="园林"></skyk-room>
    </div>
    <div v-if="marks>5 && marks<10">
    </div>
    -->
  </div>
</template>
<script>
import SkykLocation from './skyk-location.vue'
import SkykRoom from './skyk-room.vue'
import SkykApartment from './skyk-apartment.vue'
import SkykD from './skyk-3d.vue'

export default {
  name: 'NewPage',
  components: {
    SkykLocation,
    SkykD,
    SkykRoom,
    SkykApartment
  },
  props: {
    mark: {
      type: String,
      default: '4'
    },
    name: String
  },
  data () {
    return {}
  },
  computed: {
    marks () {
      return Number(this.mark)
    }
  },
  methods: {}
}
</script>
