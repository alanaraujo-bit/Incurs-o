import { Link } from 'react-router-dom'
import { Page } from '../components/layout/AppShell'
import { Button, EmptyState } from '../components/ui/primitives'
import { IconDoom } from '../components/ui/Icon'

export default function NotFound() {
  return (
    <Page width="narrow">
      <EmptyState
        icon={<IconDoom size={32} />}
        title="Esta realidade não existe"
        body="O endereço que você abriu não corresponde a nenhuma página da rota. Pode ter sido um link antigo ou um erro de digitação."
        action={
          <Link to="/">
            <Button variant="primary">Voltar para a base</Button>
          </Link>
        }
      />
    </Page>
  )
}
