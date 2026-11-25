<template>
  <div class="console">
    <aside class="side">
      <div class="side-title">控制台</div>
      <nav class="menu">
        <button
          v-for="item in menus"
          :key="item.key"
          :class="['menu-item', { active: active === item.key }]"
          @click="switchTo(item.key)"
        >
          <span class="dot"></span>{{ item.label }}
        </button>
      </nav>
    </aside>

    <section class="content">
      <header class="topbar">
        <div class="crumbs">{{ currentLabel }}</div>
        <div class="top-right">
          <span class="balance">余额 <b>${{ balance.toFixed(2) }}</b></span>
          <button class="recharge" @click="switchTo('wallet')">充值</button>
          <span class="user">{{ user.email || user.nickname || '-' }}</span>
          <button class="ghost" @click="$emit('back')">返回广场</button>
        </div>
      </header>

      <Overview
        v-if="active === 'overview'"
        :user="user"
        :balance="balance"
        :model-count="modelCount"
        :models="models"
        @go="switchTo"
      />
      <Wallet v-else-if="active === 'wallet'" :balance="balance" />
      <Tokens v-else-if="active === 'tokens'" />
      <Logs v-else-if="active === 'logs'" />
      <Bills v-else-if="active === 'bills'" />
      <Flows v-else-if="active === 'flows'" />
      <Invite v-else-if="active === 'invite'" :user="user" />
      <Settings v-else-if="active === 'settings'" :user="user" @logout="$emit('logout')" />
      <EmptyPage v-else :title="currentLabel" :desc="currentDesc" :action="currentAction" />
    </section>
  </div>
</template>

<script src="./Console.js"></script>
