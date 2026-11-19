import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  Download,
  FileText,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Moon,
  Network,
  QrCode,
  Sun,
  X,
} from 'lucide-react'
import { introText, libraryBooks, methodSteps, projects, timeline } from '../data'
import type { Project } from '../data'
import '../App.css'
import '../motion.css'
import '../themes.css'

const email = 'lizhao086@126.com'
const wechatId = 'njxshr'
const navItems = [
  { href: '#method', label: '工作方法' },
  { href: '#practice', label: '作品实践' },
  { href: '#library', label: '公开书稿' },
  { href: '#journey', label: '职业路径' },
]

const revealDelay = (index: number) => ({ '--reveal-delay': `${Math.min(index * 70, 210)}ms` }) as React.CSSProperties

async function writeToClipboard(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  textarea.remove()
  if (!copied) throw new Error('copy failed')
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {project && (
        <div className="dialog-inner">
          <div className="dialog-topline">
            <span className="status-label"><span aria-hidden="true" />{project.status}</span>
            <button className="icon-button" type="button" onClick={onClose} aria-label="关闭项目说明" autoFocus>
              <X size={20} aria-hidden="true" />
            </button>
          </div>
          <h2 id="project-dialog-title">{project.title}</h2>
          <div className="dialog-copy">
            {project.details.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="dialog-deliverables">
            <h3>留下的交付物</h3>
            <ul>
              {project.deliverables.map((item) => (
                <li key={item}><Check size={17} aria-hidden="true" />{item}</li>
              ))}
            </ul>
          </div>
          <p className="dialog-note"><FileText size={17} aria-hidden="true" />{project.note}</p>
          <button className="button button-dark dialog-confirm" type="button" onClick={onClose}>
            返回作品列表 <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      )}
    </dialog>
  )
}

function WechatDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [copyStatus, setCopyStatus] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  const copyWechat = async () => {
    try {
      await writeToClipboard(wechatId)
      setCopyStatus('微信号已复制，可以打开微信粘贴搜索')
    } catch {
      setCopyStatus('复制未成功，请手动记录微信号 njxshr')
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="wechat-dialog"
      aria-labelledby="wechat-dialog-title"
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="wechat-dialog-inner">
        <div className="dialog-topline">
          <span className="status-label"><span aria-hidden="true" />微信沟通</span>
          <button className="icon-button" type="button" onClick={onClose} aria-label="关闭微信二维码" autoFocus>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="wechat-layout">
          <div className="qr-frame">
            <img src="images/wechat-qr.png" width="666" height="666" alt="大钊 FDE 工作室的微信二维码，微信号 njxshr" />
          </div>
          <div className="wechat-copy">
            <h2 id="wechat-dialog-title">从一个真实问题，<br />开始聊聊。</h2>
            <p>扫码添加微信，或复制微信号后搜索添加。添加时可以简单说明你的行业、想解决的问题和期望合作方式。</p>
            <div className="wechat-id"><span>微信号</span><strong>{wechatId}</strong></div>
            <button className="button button-dark" type="button" onClick={copyWechat}>
              <Copy size={17} aria-hidden="true" />复制微信号
            </button>
            <p className="wechat-copy-status" role="status" aria-live="polite">{copyStatus}</p>
            <a className="wechat-mail-link" href={`mailto:${email}`}>也可以写邮件 <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [wechatOpen, setWechatOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [showIntro, setShowIntro] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [theme, setTheme] = useState<'brand' | 'white'>(() => document.documentElement.dataset.theme === 'white' ? 'white' : 'brand')
  const toastTimer = useRef<number | undefined>(undefined)
  const scaleFieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (theme === 'white') document.documentElement.dataset.theme = 'white'
    else document.documentElement.removeAttribute('data-theme')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'white' ? '#f7faf7' : '#102d27')
    try {
      localStorage.setItem('dazhao-fde-theme', theme)
    } catch {
      // The selected theme still works when browser storage is unavailable.
    }
  }, [theme])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    }
  }, [])

  useEffect(() => {
    const introTimer = window.setTimeout(() => setShowIntro(false), 1500)
    return () => window.clearTimeout(introTimer)
  }, [])

  useEffect(() => {
    const field = scaleFieldRef.current
    if (!field) return
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reducedMotion.matches) {
      field.dataset.enabled = 'false'
      return
    }

    field.dataset.enabled = 'true'
    let frame = 0
    let latest: { x: number; y: number } | null = null
    const renderPointer = () => {
      frame = 0
      if (!latest) return
      const xRatio = latest.x / window.innerWidth - 0.5
      const yRatio = latest.y / window.innerHeight - 0.5
      field.style.setProperty('--pointer-x', `${latest.x}px`)
      field.style.setProperty('--pointer-y', `${latest.y}px`)
      field.style.setProperty('--scale-shift-x', `${xRatio * 24}px`)
      field.style.setProperty('--scale-shift-y', `${yRatio * 24}px`)
      field.dataset.active = 'true'
    }
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      latest = { x: event.clientX, y: event.clientY }
      if (!frame) frame = window.requestAnimationFrame(renderPointer)
    }
    const onPointerLeave = () => {
      latest = null
      if (frame) window.cancelAnimationFrame(frame)
      frame = 0
      field.dataset.active = 'false'
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const revealElements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    let observer: IntersectionObserver | undefined
    if (!reducedMotion.matches) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-revealed')
          observer?.unobserve(entry.target)
        })
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
      revealElements.forEach((element) => observer?.observe(element))
    } else {
      revealElements.forEach((element) => element.classList.add('is-revealed'))
    }
    return () => observer?.disconnect()
  }, [])

  const notify = (message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 2600)
  }

  const copyText = async (text: string, successMessage: string) => {
    try {
      await writeToClipboard(text)
      notify(successMessage)
    } catch {
      notify('复制未成功，请选中文本手动复制')
    }
  }

  const selectStepWithKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    let next = activeStep
    if (event.key === 'ArrowRight') next = (activeStep + 1) % methodSteps.length
    if (event.key === 'ArrowLeft') next = (activeStep - 1 + methodSteps.length) % methodSteps.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = methodSteps.length - 1
    setActiveStep(next)
    document.getElementById(`method-tab-${next}`)?.focus()
  }

  const tiltPortrait = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    element.style.setProperty('--tilt-x', `${y * -7}deg`)
    element.style.setProperty('--tilt-y', `${x * 7}deg`)
    element.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`)
    element.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`)
  }

  const resetPortrait = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = event.currentTarget
    element.style.setProperty('--tilt-x', '0deg')
    element.style.setProperty('--tilt-y', '0deg')
  }

  const step = methodSteps[activeStep]

  return (
    <>
      {showIntro && (
        <div className="opening-sequence" aria-hidden="true">
          <div className="opening-grid" />
          <div className="opening-scan" />
          <div className="opening-brand">
            <span className="opening-mark">钊<span /></span>
            <div className="opening-wordmark"><strong>大钊 FDE 工作室</strong><span>让复杂系统更容易被人使用</span></div>
          </div>
          <div className="opening-track"><span /></div>
          <span className="opening-index">AI · AGENT · FDE</span>
        </div>
      )}
      <a className="skip-link" href="#main">跳到主要内容</a>
      <div ref={scaleFieldRef} className="pointer-scales" data-active="false" aria-hidden="true">
        <div className="pointer-scales-base" />
        <div className="pointer-scales-lens"><div className="pointer-scales-plane" /></div>
      </div>
      <header className="site-header">
        <div className="site-shell header-inner">
          <a className="brand" href="#top" aria-label="大钊 FDE 工作室，返回首页">
            <span className="brand-mark" aria-hidden="true">钊<span /></span>
            <span className="brand-name">大钊 FDE 工作室<small>AI · AGENT · FDE</small></span>
          </a>
          <nav className="desktop-nav" aria-label="主要导航">
            {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <button
            className="theme-toggle"
            type="button"
            aria-label={theme === 'white' ? '暗色主题' : '白色主题'}
            aria-pressed={theme === 'white'}
            title={theme === 'white' ? '当前为白色主题，点击切换到暗色主题' : '当前为暗色主题，点击切换到白色主题'}
            onClick={() => setTheme((current) => current === 'white' ? 'brand' : 'white')}
          >
            {theme === 'white' ? <Moon size={17} aria-hidden="true" /> : <Sun size={17} aria-hidden="true" />}
            <span>{theme === 'white' ? '暗色主题' : '白色主题'}</span>
          </button>
          <button className="header-contact header-contact-button" type="button" onClick={() => setWechatOpen(true)}>
            来聊聊 <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <button
            className="mobile-menu-button icon-button"
            type="button"
            aria-label={menuOpen ? '关闭导航' : '打开导航'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="移动端导航">
            <div className="site-shell">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}<ArrowRight size={17} aria-hidden="true" /></a>
              ))}
              <button type="button" onClick={() => { setMenuOpen(false); setWechatOpen(true) }}>微信沟通<ArrowUpRight size={17} aria-hidden="true" /></button>
            </div>
          </nav>
        )}
      </header>

      <main id="main">
        <section id="top" className="hero site-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-kicker hero-enter hero-enter-one">
              <span><MapPin size={15} aria-hidden="true" />内蒙古 · 呼和浩特</span>
              <span className="availability"><i aria-hidden="true" />大钊 FDE 工作室</span>
            </div>
            <h1 id="hero-title">
              <span className="hero-title-mask"><span className="hero-title-line hero-title-line-one">把业务问题，</span></span>
              <span className="hero-title-mask"><span className="hero-title-line hero-title-line-two">做成能落地的 <em>AI。</em></span></span>
            </h1>
            <p className="hero-description hero-enter hero-enter-three">
              我是李钊（大钊），企业 AI 解决方案与 Agent 应用实践者。连接业务、产品与技术，让智能体进入真实流程，也让一次实践成为可复用的方法。
            </p>
            <div className="hero-actions hero-enter hero-enter-four">
              <a className="button button-dark" href="#practice">查看我的实践 <ArrowDown size={18} aria-hidden="true" /></a>
              <button className="text-link text-link-button" type="button" onClick={() => setWechatOpen(true)}>与我聊聊 <ArrowUpRight size={18} aria-hidden="true" /></button>
            </div>
            <dl className="hero-facts hero-enter hero-enter-five">
              <div><dt>企业软件与数字化</dt><dd>9 <span>年</span></dd></div>
              <div><dt>持续实践的起点</dt><dd>2017</dd></div>
              <div><dt>当前关注</dt><dd className="fact-text">Agent × FDE</dd></div>
            </dl>
          </div>

          <div className="portrait-stage hero-portrait-enter">
            <div className="portrait-orbit" aria-hidden="true"><span /><span /><span /></div>
            <div className="portrait-composition" onPointerMove={tiltPortrait} onPointerLeave={resetPortrait}>
              <div className="portrait-topline"><span>DAZHAO / FDE STUDIO</span><Network size={19} aria-hidden="true" /></div>
              <div className="portrait-media">
                <img src="images/lizhao-cartoon.webp" width="1024" height="1024" alt="李钊（大钊）的卡通职业头像" fetchPriority="high" />
                <span className="portrait-tag portrait-tag-top">业务 × 产品 × 技术</span>
                <span className="portrait-tag portrait-tag-bottom">把经验沉淀为方法</span>
              </div>
              <div className="portrait-caption">
                <p>让复杂系统，<br />更容易被人使用。</p>
                <span>ENTERPRISE AI<br />SOLUTION &amp; AGENT</span>
              </div>
            </div>
          </div>
        </section>

        <div className="thesis-band">
          <div className="site-shell thesis-inner" data-reveal>
            <p>从业务价值出发，<br />以可复用的交付结束。</p>
            <div className="thesis-flow" aria-label="工作主线：理解业务、连接能力、完成交付、沉淀方法">
              <span>理解业务</span><ArrowRight size={17} aria-hidden="true" />
              <span>连接能力</span><ArrowRight size={17} aria-hidden="true" />
              <span>完成交付</span><ArrowRight size={17} aria-hidden="true" />
              <span>沉淀方法</span>
            </div>
          </div>
        </div>

        <section id="method" className="method-section" aria-labelledby="method-title">
          <div className="site-shell section-pad">
            <header className="section-heading section-heading-dark" data-reveal="left">
              <div>
                <h2 id="method-title">从需求到复用，<br />走完一条真实的交付链。</h2>
              </div>
              <p>我不只关心 AI 能不能做，更关心它应该解决什么、怎样进入流程，以及下一次如何做得更好。</p>
            </header>

            <div className="method-tabs" role="tablist" aria-label="FDE 工作方法" onKeyDown={selectStepWithKeyboard} data-reveal>
              {methodSteps.map((item, index) => (
                <button
                  id={`method-tab-${index}`}
                  key={item.short}
                  type="button"
                  role="tab"
                  aria-selected={activeStep === index}
                  aria-controls="method-panel"
                  tabIndex={activeStep === index ? 0 : -1}
                  className={activeStep === index ? 'active' : ''}
                  onClick={() => setActiveStep(index)}
                >
                  <span>{item.short}</span><i aria-hidden="true" />
                </button>
              ))}
            </div>

            <div id="method-panel" className="method-panel" role="tabpanel" aria-labelledby={`method-tab-${activeStep}`} data-reveal>
              <div key={`statement-${activeStep}`} className="method-statement method-panel-enter">
                <span className="method-count">{String(activeStep + 1).padStart(2, '0')} / {String(methodSteps.length).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <div key={`output-${activeStep}`} className="method-output method-panel-enter">
                <h4>这一阶段，会留下什么</h4>
                <ul>
                  {step.outputs.map((output) => <li key={output}><Check size={18} aria-hidden="true" />{output}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="practice" className="site-shell section-pad" aria-labelledby="practice-title">
          <header className="section-heading" data-reveal="left">
            <div>
              <h2 id="practice-title">做过的事，<br />留下的作品。</h2>
            </div>
            <p>工具、方案、SOP 与书籍，是我把问题想清楚、把方法做出来的不同方式。</p>
          </header>

          <article className="featured-project interactive-surface" data-reveal>
            <div className="featured-copy">
              <span className="status-label"><span aria-hidden="true" />已公开发布 · Chrome 扩展</span>
              <h3>译间 · AI 翻译</h3>
              <p>从需求、PRD 到插件上架，把大模型翻译做成一款可以直接安装的个人工具。</p>
              <ul className="featured-points">
                <li><Check size={17} aria-hidden="true" />真实个人产品全流程</li>
                <li><Check size={17} aria-hidden="true" />公开商店可回访验证</li>
              </ul>
              <a className="button button-dark" href="https://chromewebstore.google.com/detail/%E8%AF%91%E9%97%B4-%C2%B7-ai-%E7%BF%BB%E8%AF%91/elfmhchomflmbkbogjkidjganndgccii" target="_blank" rel="noreferrer">
                打开 Chrome 商店 <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="translator-demo" aria-label="译间插件界面概念展示">
              <div className="demo-window-bar"><span /><span /><span /><small>YIJIAN / TRANSLATOR</small></div>
              <div className="demo-brand"><span>译</span><div>译间<small>AI TRANSLATOR</small></div></div>
              <div className="demo-language"><span>中文</span><ArrowRight size={17} aria-hidden="true" /><span>English</span></div>
              <div className="demo-text">让语言不再成为<br />理解世界的边界。</div>
              <div className="demo-result">Let language no longer be<br />the boundary to understanding.<span className="demo-cursor" aria-hidden="true" /></div>
              <div className="demo-foot"><span>大模型驱动</span><span>01 / 01</span></div>
            </div>
          </article>

          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-row interactive-surface" key={project.id} data-reveal style={revealDelay(index)}>
                <div className="project-row-main">
                  <span className="project-status">{project.status}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <button className="project-open" type="button" onClick={() => setSelectedProject(project)} aria-label={`查看${project.title}项目说明`}>
                  <span>项目说明</span><ArrowUpRight size={20} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="library" className="library-section" aria-labelledby="library-title">
          <div className="site-shell section-pad">
            <header className="section-heading" data-reveal="left">
              <div>
                <h2 id="library-title">把想清楚的，<br />写成能带走的。</h2>
              </div>
              <p>
                三本个人知识作品，保留完整内容，也保留事实、案例与推演的边界。选择一本，带走慢慢读。
                <a className="library-repo-link" href="https://github.com/njxshr/ruogu-books" target="_blank" rel="noreferrer" aria-label="在 GitHub 查看书稿仓库（新窗口打开）">
                  在 GitHub 查看书稿 <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </p>
            </header>
            <div className="library-list">
              {libraryBooks.map((book, index) => (
                <article className="book-row interactive-surface" key={book.href} data-reveal style={revealDelay(index)}>
                  <div className="book-topic"><span>{book.topic}</span><small>公开书稿 · PDF</small></div>
                  <div className="book-copy">
                    <h3>{book.title}<small>{book.subtitle}</small></h3>
                    <p>{book.description}</p>
                  </div>
                  <div className="book-download">
                    <span>{book.size}</span>
                    <a className="button button-dark" href={book.href} download={book.filename}>下载书稿 <Download size={17} aria-hidden="true" /></a>
                  </div>
                </article>
              ))}
            </div>
            <p className="library-note"><BookOpen size={16} aria-hidden="true" />书稿为个人知识作品，不表示正式出版或公开销售。书中教学案例与示意数据不对应真实客户成效。</p>
          </div>
        </section>

        <section id="journey" className="journey-section" aria-labelledby="journey-title">
          <div className="site-shell section-pad">
            <header className="section-heading" data-reveal="left">
              <div>
                <h2 id="journey-title">角色在变，<br />问题意识没变。</h2>
              </div>
              <p>从技术实现到产品与方案，我一直在连接人、信息和系统，让复杂工作变得更清楚。</p>
            </header>
            <ol className="timeline" data-reveal>
              {timeline.map((item) => (
                <li key={item.period}>
                  <span className="timeline-period">{item.period}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ol>
            <p className="evidence-note"><FileText size={16} aria-hidden="true" />经历按本人画像与历史履历概括，角色描述不自动对应某段任职的正式头衔。</p>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="site-shell contact-inner">
            <div className="contact-main" data-reveal="left">
              <h2 id="contact-title">把 AI 带进真实业务，<br />来聊聊。</h2>
              <p>企业 AI 场景咨询、Agent 原型与集成、FDE 培训、售前／产品职业机会、书籍与内容合作，都可以从一次沟通开始。</p>
              <div className="contact-topics" aria-label="可交流的方向">
                <span>AI 场景咨询</span><span>Agent 原型与集成</span><span>FDE 培训</span><span>职业机会</span><span>内容合作</span>
              </div>
              <div className="collaboration-process">
                <h3>合作流程</h3>
                <ol aria-label="合作流程：沟通需求、明确目标、约定交付、验证复盘">
                  <li>沟通需求</li><li>明确目标</li><li>约定交付</li><li>验证复盘</li>
                </ol>
                <p>线上协作与线下安排，可在首次沟通时确认。</p>
              </div>
            </div>
            <div className="contact-card" data-reveal="right">
              <span className="contact-card-label"><MessageSquare size={18} aria-hidden="true" />合作与沟通</span>
              <a className="email-link" href={`mailto:${email}`}>{email}</a>
              <div className="wechat-presence"><QrCode size={18} aria-hidden="true" /><span>微信号 <strong>{wechatId}</strong></span></div>
              <div className="contact-actions">
                <button className="button button-signal" type="button" onClick={() => setWechatOpen(true)}>
                  打开微信二维码 <QrCode size={18} aria-hidden="true" />
                </button>
                <a className="button button-ghost-light" href={`mailto:${email}?subject=${encodeURIComponent('想和你聊聊企业 AI / Agent / FDE 或其他合作')}`}>
                  写封邮件 <Mail size={17} aria-hidden="true" />
                </a>
              </div>
              <div className="contact-secondary">
                <button type="button" onClick={() => copyText(email, '邮箱已复制，可以去粘贴了')}><Copy size={16} aria-hidden="true" />复制邮箱</button>
                <button type="button" onClick={() => copyText(introText, '个人简介已复制')}><Copy size={16} aria-hidden="true" />复制个人简介</button>
                <a href="downloads/lizhao-intro.md" download><Download size={16} aria-hidden="true" />下载简介</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-shell footer-inner">
          <div className="footer-brand"><span className="brand-mark" aria-hidden="true">钊<span /></span><p>大钊 FDE 工作室<small>让复杂系统更容易被人使用</small></p></div>
          <a className="back-to-top" href="#top">回到顶部 <ArrowUp size={17} aria-hidden="true" /></a>
        </div>
      </footer>

      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      {wechatOpen && <WechatDialog onClose={() => setWechatOpen(false)} />}
      <div className={`toast ${toast ? 'visible' : ''}`} role="status" aria-live="polite" aria-atomic="true">
        {toast && <><Check size={18} aria-hidden="true" />{toast}</>}
      </div>
      <noscript><div className="noscript">我是李钊（大钊），企业 AI 解决方案与 Agent 应用实践者。欢迎通过 lizhao086@126.com 或微信号 njxshr 与我联系。</div></noscript>
    </>
  )
}
