<template>
  <div id="swagger-ui"></div>
</template>

<script>
import 'swagger-ui/dist/swagger-ui.css';
import SwaggerUI from 'swagger-ui'
import SwaggerUIStandalonePreset from 'swagger-ui/dist/swagger-ui-standalone-preset'
import sw from '@/assets/swagger_ex.json';

export default {
  name: "Swagger",
  mounted() {
    SwaggerUI({
      /** @todo url ведет на запрос который возвращает json или сразу вместо sw подсовывать свои данные */
      // url: 'https://gist.githubusercontent.com/lenage/08964335de9064540c8c335fb849c5da/raw/6d63e3546897356882ed7e30cd48891a24e2b354/feature.swagger.json',
      spec: sw,
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUI.presets.apis,
        SwaggerUIStandalonePreset,
      ],
    })
  }
}
</script>

<style scoped>

</style>