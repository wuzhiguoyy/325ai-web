<template>
  <div class="panel">
    <section class="notice">
      <div class="notice-label">重要通知</div>
      <div class="marquee">
        <div class="marquee-track">
          <span v-for="model in loopModels" :key="model.key" class="chip">
            <span class="chip-icon">{{ model.initial }}</span>
            {{ model.modelId }} 已上架
          </span>
        </div>
      </div>
    </section>

    <section class="toolbar">
      <div class="tabs">
        <button :class="['tab', { active: mode === 'cost' }]" @click="mode = 'cost'">费用统计</button>
        <button :class="['tab', { active: mode === 'usage' }]" @click="mode = 'usage'">用量统计</button>
      </div>
      <div class="range">
        <input v-model="start" type="date" @change="loadAll" />
        <span>→</span>
        <input v-model="end" type="date" @change="loadAll" />
      </div>
    </section>

    <section class="stats" v-if="mode === 'cost'">
      <article class="stat balance">
        <div class="label">账户余额（USD）</div>
        <div class="value">${{ balance.toFixed(2) }}</div>
        <button class="mini" @click="$emit('go', 'wallet')">充值</button>
      </article>
      <article class="stat">
        <div class="label">总消费（USD）</div>
        <div class="value">${{ money(summary.cost) }}</div>
      </article>
      <article class="stat">
        <div class="label">请求数</div>
        <div class="value">{{ summary.totalRequests || 0 }} <small>活跃令牌 {{ summary.activeTokens || 0 }}</small></div>
      </article>
      <article class="stat">
        <div class="label">请求成功率</div>
        <div class="value">{{ summary.successRate == null ? '—' : summary.successRate + '%' }}</div>
      </article>
    </section>

    <section class="stats" v-else>
      <article class="stat">
        <div class="label">总消耗 Token</div>
        <div class="value">{{ summary.totalTokens || 0 }}</div>
      </article>
      <article class="stat">
        <div class="label">输入 Token</div>
        <div class="value">{{ summary.promptTokens || 0 }}</div>
      </article>
      <article class="stat">
        <div class="label">输出 Token</div>
        <div class="value">{{ summary.completionTokens || 0 }}</div>
      </article>
      <article class="stat">
        <div class="label">缓存 Token</div>
        <div class="value">{{ summary.cachedTokens || 0 }}</div>
      </article>
    </section>

    <section class="lower">
      <article class="ranking">
        <header><h2>用量排行</h2><span class="muted">按费用</span></header>
        <ul v-if="ranking.length" class="rank-list">
          <li v-for="item in ranking" :key="item.model">
            <span class="rank-model">{{ item.model }}</span>
            <span class="rank-value">{{ mode === 'cost' ? '$' + money(item.cost) : item.tokens }}</span>
          </li>
        </ul>
        <div class="empty" v-else>{{ loading ? '加载中…' : '暂无排行' }}</div>
      </article>

      <article class="trend">
        <header><h2>{{ mode === 'cost' ? '消费趋势' : 'Token 消耗趋势' }}</h2></header>
        <div class="bars" v-if="trend.length">
          <div v-for="point in trend" :key="point.date" class="bar-item">
            <div class="bar" :style="{ height: barHeight(point) }" :title="tip(point)"></div>
            <span class="bar-date">{{ point.date.slice(5) }}</span>
          </div>
        </div>
        <div class="empty" v-else>{{ loading ? '加载中…' : '所选时间暂无数据' }}</div>
      </article>
    </section>
  </div>
</template>

<script src="./Overview.js"></script>
