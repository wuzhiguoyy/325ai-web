<template>
  <div class="panel">
    <h1 class="title">使用日志</h1>

    <section class="filters">
      <div class="row">
        <select v-model="filter.tokenId">
          <option value="">令牌</option>
          <option v-for="token in tokens" :key="token.id" :value="token.id">{{ token.name }}</option>
        </select>
        <select v-model="filter.capability">
          <option value="">模型类型</option>
          <option v-for="item in capabilities" :key="item.key" :value="item.key">{{ item.label }}</option>
        </select>
        <input v-model.trim="filter.model" placeholder="模型（完整名精确匹配）" />
        <input v-model.trim="filter.requestId" placeholder="请求 ID（完整匹配）" />
        <input v-model.trim="filter.taskId" placeholder="任务 ID（完整匹配）" />
        <select v-model="filter.status">
          <option value="">状态</option>
          <option :value="1">成功</option>
          <option :value="0">失败</option>
        </select>
      </div>

      <div class="row">
        <input v-model="start" type="date" />
        <span class="arrow">→</span>
        <input v-model="end" type="date" />
        <button class="primary" @click="query">查询</button>
        <button class="ghost" @click="reset">重置</button>
      </div>

      <div class="tools">
        <span class="count">共 {{ total }} 条</span>
        <div class="pager">
          <button class="ghost" :disabled="page <= 1 || loading" @click="goPage(page - 1)">上一页</button>
          <span class="page-num">{{ page }} / {{ totalPages }}</span>
          <button class="ghost" :disabled="page >= totalPages || loading" @click="goPage(page + 1)">下一页</button>
          <select v-model.number="pageSize" @change="query">
            <option :value="20">20 条 / 页</option>
            <option :value="50">50 条 / 页</option>
            <option :value="100">100 条 / 页</option>
          </select>
        </div>
      </div>
    </section>

    <section class="table-wrap">
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>时间</th>
              <th>令牌</th>
              <th>模型</th>
              <th>请求 ID</th>
              <th>任务 ID</th>
              <th>模型类型</th>
              <th>状态</th>
              <th>耗时 / 首字</th>
              <th>用量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="9" class="empty">加载中…</td>
            </tr>
            <tr v-else-if="error">
              <td colspan="9" class="empty">{{ error }}</td>
            </tr>
            <tr v-else-if="!rows.length">
              <td colspan="9" class="empty">
                <div class="empty-icon">▤</div>
                <div>暂无数据</div>
              </td>
            </tr>
            <tr v-for="row in rows" :key="row.id">
              <td>{{ formatTime(row.time) }}</td>
              <td>{{ row.tokenName || '-' }}</td>
              <td>{{ row.model }}</td>
              <td class="mono">{{ row.requestId || '—' }}</td>
              <td class="mono">{{ row.taskId || '—' }}</td>
              <td>{{ capabilityLabel(row.capability) }}</td>
              <td>
                <span :class="['tag', row.status === 1 ? 'ok' : 'fail']">
                  {{ row.status === 1 ? '成功' : '失败' }}
                </span>
              </td>
              <td>{{ row.latencyMs == null ? '-' : row.latencyMs + 'ms' }} / {{ row.firstTokenMs == null ? '-' : row.firstTokenMs + 'ms' }}</td>
              <td>{{ row.totalTokens == null ? '-' : row.totalTokens }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script src="./Logs.js"></script>
