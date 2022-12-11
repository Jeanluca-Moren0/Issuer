
import { QueryClient, QueryClientProvider} from 'react-query'
import './index.css'
import { Home } from './screens/Home';


const queryClient = new QueryClient();





function App() {
  return (
    <QueryClientProvider client={queryClient}>

      <Home />
    </QueryClientProvider>
  )
}

export default App
