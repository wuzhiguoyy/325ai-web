<template>
  <div class="panel">
    <section class="summary">
      <article class="stat blue">
        <div class="icon">📈</div>
        <div>
          <div class="label">累计请求</div>
          <div class="value">{{ summary.totalRequests || 0 }}</div>
        </div>
      </article>
      <article class="stat green">
        <div class="icon">✓</div>
        <div>
          <div class="label">成功请求</div>
          <div class="value">{{ summary.successRequests || 0 }}</div>
        </div>
      </article>
      <article class="stat amber">
        <div class="icon">$</div>
        <div>
          <div class="label">账单金额</div>
          <div class="value">${{ money(summary.totalAmount) }}</div>
        </div>
      </article>
    </section>

    <section class="filters">
      <label class="month">
        <span>账单月份</span>
        <input v-model="month" type="month" />
      </label>
      <button class="primary" @click="query">查询</button>
      <button class="ghost" @click="reset">重置</button>
    </section>

    <section class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>账单月份</th>
            <th>总请求数</th>
            <th>成功请求</th>
            <th>消费金额</th>
            <th>状态</th>
            <th>出账时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="7" class="empty">加载中…</td>
          </tr>
          <tr v-else-if="error">
            <td colspan="7" class="empty">{{ error }}</td>
          </tr>
          <tr v-else-if="!rows.length">
            <td colspan="7" class="empty">
              <div class="empty-icon">▤</div>
              <div>暂无账单记录</div>
            </td>
          </tr>
          <tr v-for="bill in rows" :key="bill.billNo">
            <td>{{ bill.billMonth }}</td>
            <td>{{ bill.requestCount }}</td>
            <td>{{ bill.successCount }}</td>
            <td>${{ money(bill.amount) }}</td>
            <td><span :class="['tag', bill.status === 'PAID' ? 'paid' : '']">{{ statusLabel(bill.status) }}</span></td>
            <td>{{ formatTime(bill.generateTime) }}</td>
            <td><button class="link" @click="download(bill)">导出</button></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="pager" v-if="total > pageSize">
      <button class="ghost" :disabled="page <= 1" @click="goPage(page - 1)">上一页</button>
      <span>{{ page }} / {{ totalPages }}</span>
      <button class="ghost" :disabled="page >= totalPages" @click="goPage(page + 1)">下一页</button>
    </section>
  </div>
</template>

<script src="./Bills.js"></script>
