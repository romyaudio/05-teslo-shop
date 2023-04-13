import { useForm } from "react-hook-form"
import { ErrorOutline } from "@mui/icons-material"
import { Button, Chip, Divider, Grid, Link, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import NextLink from "next/link"
import { GetServerSideProps } from 'next'
import { useEffect, useState } from "react"
import { AuthLayout } from "../../components/layouts"
import { validations } from "../../utils"
import { useRouter } from "next/router"
import { signIn, getProviders } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]"

type FormData = {
  email: string,
  password: string,
};
const LoginPage = () => {
  const router = useRouter()

  //const {loginUser} = useContext(AuthContext)

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const [showError, setShowError] = useState(false)

  const [providers, setProvider] = useState<any>({})

  useEffect(() => {
    getProviders().then(prov => {
      setProvider(prov)
    })


  }, ([])

  )
  const onLoginUser = async ({ email, password }: FormData) => {

    setShowError(false)

    //   const isValidLogin = await loginUser(email,password)
    //   if(!isValidLogin){
    //   setShowError(true)
    //   setTimeout(() => setShowError(false), 3000);
    //   return
    //   }
    //   const destination =  router.query.p?.toString() || '/'
    //   router.replace(destination)

    await signIn('credentials', { email, password })

  }

  return (
    <AuthLayout title={"Ingresar"}>
      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component='h1'>Inicial Sesión</Typography>
              <Chip
                label="No reconocemos ese usuario o contraseña"
                color="error"
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex-1' : 'none' }}

              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type='email'
                label='Correo'
                variant="filled"
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail
                })}
                error={!!errors.email}
                helperText={errors.email?.message
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Contraseña'
                type='password'
                variant="filled"
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button color="secondary" fullWidth size="large" type="submit">
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display='flex' justifyContent="end">
              <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'} passHref legacyBehavior>
                <Link underline="always">
                  No tiene cuenta?
                </Link>

              </NextLink>
            </Grid>

            <Grid item xs={12} display='flex' flexDirection='column' justifyContent="end">
              <Divider sx={{ width: '100%', mb: 2 }} />
              {
                Object.values(providers).map((provider: any) => {
                  if (provider.id === 'credentials') return (<div key='credentials'></div>)

                  return (
                    <Button
                      key={provider.id}
                      variant="outlined"
                      fullWidth
                      color="primary"
                      sx={{ mb: 1 }}
                      onClick={() => signIn(provider.id)}
                    >
                      {provider.name}
                    </Button>
                  )

                })
              }
            </Grid>

          </Grid>

        </Box>
      </form>
    </AuthLayout>
  )
}

export default LoginPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const { p = '/' } = query
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    return {
      redirect: {
        destination: p.toLocaleString(),
        permanent: false,
      }
    }
  }
  return {
    props: {

    }
  }
}