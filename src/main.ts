import './style.css'
import { setupTestCallButton } from './counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div>
        <div class="box red" id="navbar">
            <div>
                 <div id="filters"></div>
                 <button id="fetchNextPageButton" type="button"></button>
                 <button id="restartFetch" type="button"></button>
            </div>
        </div>
      <div id="builds"></div>
    </div>
  </div>
`

setupTestCallButton(
    document.querySelector<HTMLButtonElement>('#fetchNextPageButton')!,
    document.querySelector<HTMLButtonElement>('#restartFetch')!,
    document.querySelector<HTMLDivElement>('#builds')!,
    document.querySelector<HTMLDivElement>('#filters')!)
