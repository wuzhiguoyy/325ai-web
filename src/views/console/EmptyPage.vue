<template>
  <div class="panel">
    <section class="card">
      <h1>{{ title }}</h1>
      <p class="desc">{{ desc }}</p>
      <button v-if="action" class="primary" disabled>{{ action }}（待接入）</button>
    </section>

    <section class="empty">
      <div class="empty-title">暂无数据</div>
      <div class="empty-desc">该模块接口接入后会在这里展示明细。</div>
    </section>
  </div>
</template>

<script src="./EmptyPage.js"></script>
