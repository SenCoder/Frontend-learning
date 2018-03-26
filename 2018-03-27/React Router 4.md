# React Router 4 入门

* eact-router React Router 核心
* react-router-dom 用于 DOM 绑定的 React Router
* react-router-native 用于 React Native 的 React Router
* react-router-redux React Router 和 Redux 的集成
* react-router-config 静态路由配置帮助助手


> 在 React 的使用中，我们一般要引入两个包，react 和 react-dom，那么 react-router 和 react-router-dom 是不是两个都要引用呢？
> 非也，坑就在这里。他们两个只要引用一个就行了，不同之处就是后者比前者多出了 <Link> <BrowserRouter> 这样的 DOM 类组件。


在4.0之前版本的 API 中，<Router> 组件的 children 只能是 React Router 提供的各种组件，如<Route>、<IndexRoute>、<Redirect>等。而在 React Router 4 中，你可以将各种组件及标签放进 <Router>组件中。


对于网页项目，存在<BrowserRouter>与<HashRouter>两种组件。当存在服务区来管理动态请求时，需要使用<BrowserRouter>组件，而<HashRouter>被用于静态网站。通常，我们更倾向选择<BrowserRouter>，但如果你的网站仅用来呈现静态文件，那么<HashRouter>将会是一个好选择。

> 
> 每个路由器都会创建一个history对象并用其保持追踪当前location[注1]并且在有变化时对网站进行重新渲染。这个history对象保证了React Router提供的其他组件的可用性，所以其他组件必须在router内部渲染。一个React Router组件如果向父级上追溯却找不到router组件，那么这个组件将无法正常工作。


```js
import { BrowserRouter } from 'react-router-dom'

// this component will be rendered by our <___Router>
const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
```


\<Route\>组件是React Router中主要的结构单元。在任意位置只要匹配了URL的路径名(pathname)你就可以创建<Route>元素进行渲染。

可以在路由器(router)组件中的任意位置创建多个<Route>，但通常我们会把它们放在同一个位置。使用<Switch>组件来包裹一组<Route>。<Switch>会遍历自身的子元素（即路由）并对第一个匹配当前路径的元素进行渲染。

```jsx
<Switch>
  <Route exact path='/' component={Home}/>
  {/* both /roster and /roster/:number begin with /roster */}
  <Route path='/roster' component={Roster}/>
  <Route path='/schedule' component={Schedule}/>
</Switch>
```

当一个路由的path匹配成功后，路由用来确定渲染结果的参数有三种。只需要提供其中一个即可。

* component ： 一个React组件。当带有component参数的route匹配成功后，route会返回一个新的元素，其为component参数所对应的React组件（使用React.createElement创建）。
* render ： 一个返回React element的函数[注5]。当匹配成功后调用该函数。该过程与传入component参数类似，并且对于行级渲染与需要向元素传入额外参数的操作会更有用。
* children ： 一个返回React element的函数。与上述两个参数不同，无论route是否匹配当前location，其都会被渲染。


```js
// For this demo, we are using the UMD build of react-router-dom
const {
  HashRouter,
  Switch,
  Route,
  Link
} = ReactRouterDOM

// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const PlayerAPI = {
  players: [
    { number: 1, name: "Ben Blocker", position: "G" },
    { number: 2, name: "Dave Defender", position: "D" },
    { number: 3, name: "Sam Sweeper", position: "D" },
    { number: 4, name: "Matt Midfielder", position: "M" },
    { number: 5, name: "William Winger", position: "M" },
    { number: 6, name: "Fillipe Forward", position: "F" }
  ],
  all: function() { return this.players},
  get: function(id) {
    const isPlayer = p => p.number === id
    return this.players.find(isPlayer)
  }
}

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const FullRoster = () => (
  <div>
    <ul>
      {
        PlayerAPI.all().map(p => (
          <li key={p.number}>
            <Link to={`/roster/${p.number}`}>{p.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const Player = (props) => {
  const player = PlayerAPI.get(
    parseInt(props.match.params.number, 10)
  )
  if (!player) {
    return <div>Sorry, but the player was not found</div>
  }
  return (
    <div>
      <h1>{player.name} (#{player.number})</h1>
      <h2>Position: {player.position}</h2>
      <Link to='/roster'>Back</Link>
    </div>
  )
}

// The Roster component matches one of two different routes
// depending on the full pathname
const Roster = () => (
  <Switch>
    <Route exact path='/roster' component={FullRoster}/>
    <Route path='/roster/:number' component={Player}/>
  </Switch>
)

const Schedule = () => (
  <div>
    <ul>
      <li>6/5 @ Evergreens</li>
      <li>6/8 vs Kickers</li>
      <li>6/14 @ United</li>
    </ul>
  </div>
)

const Home = () => (
  <div>
    <h1>Welcome to the Tornadoes Website!</h1>
  </div>
)

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/roster' component={Roster}/>
      <Route path='/schedule' component={Schedule}/>
    </Switch>
  </main>
)

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/roster'>Roster</Link></li>
        <li><Link to='/schedule'>Schedule</Link></li>
      </ul>
    </nav>
  </header>
)

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

// This demo uses a HashRouter instead of BrowserRouter
// because there is no server to match URLs
ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('root'))

```