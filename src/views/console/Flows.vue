<template>
  <div class="panel">
    <h1 class="title">计费流水</h1>

    <section class="filters">
      <div class="row">
        <select v-model="type">
          <option value="">类型</option>
          <option value="recharge">充值</option>
          <option value="consume">消费</option>
          <option value="refund">退款</option>
          <option value="gift">赠送</option>
          <option value="adjust">调整</option>
        </select>
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
              <th>流水号</th>
              <th>类型</th>
              <th>收支</th>
              <th>金额（USD）</th>
              <th>变动后余额</th>
              <th>关联单号</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading">
              <td colspan="8" class="empty">加载中…</td>
            </tr>
            <tr v-else-if="error">
              <td colspan="8" class="empty">{{ error }}</td>
            </tr>
            <tr v-else-if="!rows.length">
              <td colspan="8" class="empty">暂无流水</td>
            </tr>
            <tr v-for="row in rows" :key="row.flowNo">
              <td>{{ formatTime(row.createTime) }}</td>
              <td class="mono">{{ row.flowNo }}</td>
              <td><span class="tag">{{ typeLabel(row.type) }}</span></td>
              <td>{{ row.direction === 1 ? '收入' : '支出' }}</td>
              <td>{{ row.direction === 1 ? '+' : '-' }}${{ money(row.amount) }}</td>
              <td>${{ money(row.balanceAfter) }}</td>
              <td class="mono">{{ row.bizNo || '—' }}</td>
              <td>{{ row.remark || '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script src="./Flows.js"></script>
