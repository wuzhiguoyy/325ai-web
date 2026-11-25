<template>
  <div class="docs">
    <header class="head">
      <h1>接入文档</h1>
      <p>325聚合模型统一 API：一个令牌调用全部模型，按量计费。</p>
    </header>

    <nav class="toc">
      <a href="#auth">鉴权</a>
      <a href="#chat">对话</a>
      <a href="#models">模型</a>
      <a href="#account">账户</a>
      <a href="#errors">错误码</a>
    </nav>

    <section id="auth" class="block">
      <h2>鉴权</h2>
      <p>所有模型接口需在请求头携带令牌：</p>
      <pre>Authorization: Bearer sk-325-xxxxxxxx</pre>
      <p class="muted">令牌在控制台「令牌管理」创建，明文只显示一次。</p>
    </section>

    <section id="chat" class="block">
      <h2>对话</h2>
      <p><code>POST /api/paypal/chat</code></p>
      <pre>curl -X POST "{{ baseUrl }}/api/paypal/chat" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $KEY" \
  -d '{"instruction":"你好","model":"你的模型名","maxTokens":512}'</pre>
      <p>返回：</p>
      <pre>{ "content": "……" }</pre>
      <p class="muted">model 可空：传了必须存在于模型库，不传则使用该能力的默认模型。所有模型接口均需令牌，并按调用扣费。</p>
    </section>

    <section id="models" class="block">
      <h2>模型</h2>
      <p><code>GET /api/paypal/models?pageNum=1&amp;pageSize=20&amp;capability=text</code></p>
      <p><code>GET /api/paypal/models/{modelId}</code> 模型详情（售价、上下文）</p>
      <p><code>GET /api/paypal/models/capabilities</code> 分类聚合</p>
      <pre>curl "{{ baseUrl }}/api/paypal/models?pageNum=1&amp;pageSize=5"</pre>
    </section>

    <section id="account" class="block">
      <h2>账户与用量</h2>
      <p><code>POST /api/paypal/account/info</code> 余额（body 传登录 token）</p>
      <p><code>POST /api/paypal/usage/summary</code> 用量汇总</p>
      <p><code>POST /api/paypal/usage/logs</code> 调用日志</p>
      <pre>curl -X POST "{{ baseUrl }}/api/paypal/account/info" \
  -H "Content-Type: application/json" \
  -d '{"token":"登录返回的 JWT"}'</pre>
    </section>

    <section id="errors" class="block">
      <h2>错误码</h2>
      <table>
        <thead><tr><th>HTTP</th><th>含义</th></tr></thead>
        <tbody>
          <tr><td>400</td><td>参数错误（缺字段、日期格式、邀请码无效）</td></tr>
          <tr><td>401</td><td>令牌缺失、无效或已停用</td></tr>
          <tr><td>402</td><td>余额不足</td></tr>
          <tr><td>404</td><td>模型或订单不存在</td></tr>
          <tr><td>500</td><td>上游调用失败</td></tr>
        </tbody>
      </table>
    </section>

    <footer class="foot">
      <a href="#/">← 返回模型广场</a>
    </footer>
  </div>
</template>

<script src="./Docs.js"></script>
