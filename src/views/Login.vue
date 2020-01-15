<template>
  <div class="login"></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$toast.loading({ mask: true, duration: 0, message: "加载中..." });
    this.$store.commit("setNewUser", isNewUser);
    if (this.$store.state.newUser == "222") {
      this.$router.push({ name: "init" });
    } else {
      // if (userType == "worker") {
      //   this.$store.commit("setUserType", "2");
      // } else {
      //   this.$store.commit("setUserType", "1");
      // }
      this.$router.push({ name: "home" });
    }
  }
};
</script>
