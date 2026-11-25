<template>
  <article class="card">
    <div class="card-head">
      <img v-if="model.iconUrl" :src="model.iconUrl" alt="" class="icon" @error="showFallback = true" />
      <div v-if="!model.iconUrl || showFallback" class="icon icon-fallback">{{ initial }}</div>
      <div class="head-text">
        <h3>{{ model.modelId }}</h3>
        <p>ID · {{ model.modelId }}</p>
      </div>
    </div>

    <div class="meta">
      <span class="tag">{{ capabilityLabel }}</span>
      <span v-if="contextLabel" class="context">{{ contextLabel }} 上下文</span>
    </div>
  </article>
</template>

<script src="./ModelCard.js"></script>
