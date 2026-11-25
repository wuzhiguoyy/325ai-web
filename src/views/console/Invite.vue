<template>
  <div class="panel">
    <div class="top">
      <section class="invite-card">
        <div class="invite-text">
          <h1>邀请好友，获得奖励</h1>
          <p>分享专属链接，好友注册及调用均可获得奖励。</p>
          <div class="link-row">
            <input :value="info.link" readonly />
            <button class="primary" @click="copyLink">{{ copied ? '已复制' : '复制链接' }}</button>
          </div>
        </div>
        <div class="qr-block">
          <img v-if="info.qrCode" :src="info.qrCode" alt="邀请二维码" class="qr" />
          <div v-else class="qr placeholder">生成中…</div>
          <div class="qr-caption">扫码邀请好友</div>
        </div>
      </section>

      <section class="commission">
        <header>
          <h2>累计佣金</h2>
          <button class="link" @click="tab = 'rewards'">查看入账记录 ↗</button>
        </header>
        <div class="amount">${{ money(info.totalCommission) }}</div>
        <div class="split">
          <div><span>已结算</span><b>${{ money(info.settledCommission) }}</b></div>
          <div><span>待结算</span><b>${{ money(info.pendingCommission) }}</b></div>
        </div>
      </section>
    </div>

    <section class="facts">
      <div class="fact"><span class="icon">👥</span><div><div class="label">累计邀请</div><div class="value">{{ info.inviteCount || 0 }} 人</div></div></div>
      <div class="fact"><span class="icon">🎁</span><div><div class="label">每位好友注册奖励</div><div class="value">${{ money(info.registerReward) }}</div></div></div>
      <div class="fact"><span class="icon">📈</span><div><div class="label">好友消费返佣</div><div class="value">{{ ratePercent }}%</div></div></div>
      <div class="fact"><span class="icon">⏱</span><div><div class="label">次日起自动入账至钱包</div><div class="value">T+1 结算</div></div></div>
    </section>

    <section class="list">
      <header class="list-head">
        <div class="tabs">
          <button :class="['tab', { active: tab === 'invitees' }]" @click="switchTab('invitees')">我的邀请</button>
          <button :class="['tab', { active: tab === 'rewards' }]" @click="switchTab('rewards')">佣金明细</button>
        </div>
        <div class="list-tools">
          <input v-if="tab === 'invitees'" v-model.trim="keyword" placeholder="搜索邮箱" />
          <span class="count">共 {{ total }} 条</span>
        </div>
      </header>

      <table v-if="tab === 'invitees'">
        <thead>
          <tr>
            <th>邀请用户</th>
            <th>注册时间</th>
            <th>已结算返佣</th>
            <th>待结算返佣</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="4" class="empty">加载中…</td>
          </tr>
          <tr v-else-if="!visibleInvitees.length">
            <td colspan="4" class="empty">
              <div class="empty-icon">👥</div>
              <div class="empty-title">还没有邀请的好友</div>
              <div class="empty-desc">复制上方专属链接分享给好友，好友注册后会出现在这里</div>
            </td>
          </tr>
          <tr v-for="item in visibleInvitees" :key="item.userId">
            <td>{{ item.email }}</td>
            <td>{{ formatTime(item.registerTime) }}</td>
            <td>${{ money(item.settledAmount) }}</td>
            <td>${{ money(item.pendingAmount) }}</td>
          </tr>
        </tbody>
      </table>

      <table v-else>
        <thead>
          <tr>
            <th>时间</th>
            <th>类型</th>
            <th>被邀请人</th>
            <th>奖励金额</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="5" class="empty">加载中…</td>
          </tr>
          <tr v-else-if="!rewards.length">
            <td colspan="5" class="empty">暂无佣金明细</td>
          </tr>
          <tr v-for="item in rewards" :key="item.rewardNo">
            <td>{{ formatTime(item.createTime) }}</td>
            <td>{{ item.type === 'register' ? '注册奖励' : '消费返佣' }}</td>
            <td>{{ item.inviteeUserId }}</td>
            <td>${{ money(item.amount) }}</td>
            <td><span class="status">{{ item.status === 'SETTLED' ? '已结算' : '待结算' }}</span></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script src="./Invite.js"></script>
