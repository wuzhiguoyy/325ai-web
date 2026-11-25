<template>
  <div class="panel">
    <section class="balance-card">
      <div class="label">可用余额（USD）</div>
      <div class="amount">${{ money(balance) }}</div>
      <div class="hint">{{ balance > 0 ? '余额充足' : '余额不足，请及时充值' }}</div>
    </section>

    <section class="orders" v-if="orders.length">
      <header class="records-head">
        <h2>待支付订单</h2>
        <span class="muted">共 {{ orders.length }} 笔</span>
      </header>
      <ul class="order-list">
        <li v-for="order in orders" :key="order.orderNo">
          <div class="order-main">
            <div class="order-no">{{ order.orderNo }}</div>
            <div class="order-meta">
              {{ order.channel.toUpperCase() }} · 应付 ${{ money(order.payAmount) }} {{ order.payCurrency }}
              · 过期 {{ formatTime(order.expireTime) }}
            </div>
          </div>
          <div class="order-actions">
            <template v-if="order.channel === 'usdt'">
              <button class="ghost" @click="copyText(order.address || address)">复制地址</button>
            </template>
            <button v-else class="ghost" disabled>去支付（待接入）</button>
          </div>
        </li>
      </ul>
    </section>

    <div class="columns">
      <section class="card">
        <header class="card-head">
          <h2>USDT 扫码充值</h2>
          <span class="tag">TRC20</span>
        </header>
        <p class="desc">仅支持 TRC20 网络，请勿使用 ERC20 / BEP20，否则无法找回。</p>

        <div class="qr-wrap">
          <img v-if="qrDataUrl" :src="qrDataUrl" alt="USDT 充值地址二维码" class="qr" />
          <div v-else class="qr placeholder">未配置收款地址</div>
        </div>

        <div class="address-box">
          <div class="address">{{ address || '未配置收款地址' }}</div>
          <button class="copy" :disabled="!address" @click="copyText(address)">{{ copied ? '已复制' : '复制地址' }}</button>
        </div>
        <p class="note">该地址与当前账号唯一绑定，转账多少到账多少。</p>
      </section>

      <section class="card">
        <header class="card-head">
          <h2>在线充值</h2>
          <span class="tag">USDT / PayPal</span>
        </header>
        <p class="desc">选择金额，创建订单后按提示支付。</p>

        <div class="amounts">
          <button
            v-for="item in presets"
            :key="item"
            :class="['amount', { active: amount === item }]"
            @click="amount = item"
          >${{ item }}</button>
        </div>

        <label class="custom">
          <span>自定义金额</span>
          <input v-model.number="amount" type="number" min="1" step="1" />
        </label>

        <div class="summary">
          <div><span>本次充值</span><b>+ ${{ money(amount) }}</b></div>
          <div><span>充值后余额</span><b>${{ money(balance + Number(amount || 0)) }}</b></div>
        </div>

        <div class="channels">
          <button class="primary" :disabled="creating" @click="submit('usdt')">
            {{ creating === 'usdt' ? '创建中…' : 'USDT 充值' }}
          </button>
          <button class="primary ghost-primary" :disabled="creating" @click="submit('paypal')">
            {{ creating === 'paypal' ? '创建中…' : 'PayPal 充值' }}
          </button>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="notice" class="notice">{{ notice }}</p>
      </section>
    </div>

    <section class="records">
      <header class="records-head">
        <h2>充值记录</h2>
        <span class="muted">共 {{ total }} 条</span>
      </header>
      <table>
        <thead>
          <tr><th>到账时间</th><th>金额（USD）</th><th>渠道</th><th>状态</th></tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="4" class="empty">加载中…</td>
          </tr>
          <tr v-else-if="!records.length">
            <td colspan="4" class="empty">暂无充值记录</td>
          </tr>
          <tr v-for="record in records" :key="record.recordNo">
            <td>{{ formatTime(record.notifyTime || record.createTime) }}</td>
            <td>${{ money(record.creditedAmount) }}</td>
            <td>{{ record.channel }}</td>
            <td><span class="status">{{ record.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script src="./Wallet.js"></script>
