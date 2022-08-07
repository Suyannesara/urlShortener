<template>
  <div>
    <Header></Header>
    <p id="explanation">
      Urls organizadas de acordo com quantidade de acessos. <br />
      Assim você pode saber os tópicos de maior relevância <br />
      para seu público :D.
    </p>
    <div class="urls-container">
      <div v-for="urlData in this.urlsData" class="url-card">
        <details>
          <summary>{{ urlData.keyword }}</summary>
          <div class="hide-info">
            <p>{{ urlData.shortUrl }}</p>
            <p>
              clicks: <span>{{ urlData.clicks }}</span>
            </p>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script>
import urlInfo from "@/services/urlInfo";
import Header from "../components/Header.vue";

export default {
  name: "Analysis",
  components: {
    Header,
  },
  data() {
    return {
      urlsData: [],
    };
  },

  mounted() {
    urlInfo.list().then((res) => {
      let urlsData = res.data.shortUrls;

      if (urlsData.length == 0) {
        document.getElementById("explanation").innerText =
          'Ainda não há nada por aqui! Cadastre uma url na página "Encurtador" ';
      }

      //Ordering info by numbers off clicks
      urlsData.sort((urlA, urlB) => {
        if (urlA.clicks > urlB.clicks) {
          return -1;
        }
      });

      this.urlsData = urlsData;
    });
  },
};
</script>

<style scoped>
#explanation {
  color: #ffff;
  line-height: 1.5em;
}

.urls-container {
  width: 400px;
  height: 85vh;
}

.url-card {
  width: 400px;
  height: fit-content;
  margin-bottom: 2%;

  background-color: #ffff;
  border-radius: 3px;

  color: #3f3f3f;
}

details {
  padding: 4%;
}

.hide-info {
  display: flex;

  justify-content: space-between;
  padding: 0px 40px 0px 20px;
}

summary {
  font-weight: 500;
}

.hide-info p {
  font-weight: 400;
  color: #cecece;
}

.hide-info span {
  font-weight: 300;
  color: #3f3f3f;
}
</style>
