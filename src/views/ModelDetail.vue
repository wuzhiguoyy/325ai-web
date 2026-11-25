<template>
  <div class="detail">
    <nav class="crumbs">
      <a href="#/">模型广场</a><span>/</span><span>{{ modelId }}</span>
    </nav>

    <section class="hero" v-if="model">
      <div class="hero-main">
        <div class="title-row">
          <h1>{{ model.modelId }}</h1>
          <span class="tag">{{ capabilityLabel }}</span>
          <span class="tag ghost" v-if="model.pricingUnit">{{ model.pricingUnit }}</span>
        </div>

        <p class="desc" v-if="model.description">{{ model.description }}</p>

        <div class="tags" v-if="model.tags && model.tags.length">
          <span v-for="item in model.tags" :key="item" class="chip">{{ item }}</span>
        </div>

        <div class="meta-grid">
          <div v-if="model.inputModality" class="meta-item">
            <span>输入模态</span><b>{{ model.inputModality }}</b>
          </div>
          <div v-if="model.outputModality" class="meta-item">
            <span>输出模态</span><b>{{ model.outputModality }}</b>
          </div>
          <div v-if="model.maxSourceSizeMb" class="meta-item">
            <span>最大源文件</span><b>{{ model.maxSourceSizeMb }} MB</b>
          </div>
          <div v-if="model.maxContext" class="meta-item">
            <span>上下文</span><b>{{ contextLabel }}</b>
          </div>
        </div>

        <div class="lists">
          <div v-if="model.supportedResolutions && model.supportedResolutions.length" class="list-block">
            <div class="label">支持分辨率</div>
            <div class="values">
              <span v-for="item in model.supportedResolutions" :key="item">{{ item }}</span>
            </div>
          </div>
          <div v-if="model.parameterModes && model.parameterModes.length" class="list-block">
            <div class="label">参数模式</div>
            <div class="values">
              <span v-for="item in model.parameterModes" :key="item">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <aside class="price-card">
        <div class="label">计费</div>
        <div class="value">{{ priceText }}</div>
        <div class="unit" v-if="model.unitPrice != null && !model.perCallPrice">
          {{ formatPrice(model.unitPrice) }} / {{ model.pricingUnit || '单位' }}
        </div>
        <button class="primary" disabled>获取 API Key</button>
        <p class="hint">登录控制台创建令牌后调用</p>
        <a v-if="model.docUrl" class="doc-link" :href="model.docUrl" target="_blank" rel="noopener">查看官方文档 ↗</a>
      </aside>
    </section>

    <section v-else-if="loading" class="state">加载中…</section>
    <section v-else class="state">未找到模型 {{ modelId }}</section>

    <section class="api" v-if="model">
      <h2>调用方式</h2>
      <pre>{{ sample }}</pre>
    </section>

    <section class="api" v-if="model && schemaRows.length">
      <h2>API 参数</h2>
      <table>
        <thead><tr><th>参数</th><th>说明</th></tr></thead>
        <tbody>
          <tr v-for="row in schemaRows" :key="row.name">
            <td class="mono">{{ row.name }}</td>
            <td>{{ row.desc }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <footer class="foot">
      <a href="#/sitemap">网站地图</a>
      <a href="#/docs">接入文档</a>
      <a href="#/">← 返回模型广场</a>
    </footer>
  </div>
</template>

<script src="./ModelDetail.js"></script>
