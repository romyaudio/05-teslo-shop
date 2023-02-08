import { useContext } from "react";
import NextLink from "next/link";
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
import { SearchOutlined,ShoppingCartOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { UIContext } from "../../context";



export const Navbar = () => {

  const {toggleSideMenu} = useContext(UIContext)

  const {asPath} = useRouter()
  return (
    <AppBar>
        <Toolbar>
           <NextLink href={'/'} legacyBehavior passHref>
             <Link display='flex' alignItems='center'>
              <Typography variant="h6">Teslo |</Typography>
              <Typography sx={{ml:0.5}} >Shop</Typography>
             </Link>
           </NextLink>

           <Box flex={1}/>

             <Box sx={{display:{xs:'none',sm:'block'}}}>
                <NextLink  href='/category/men' passHref legacyBehavior>
                    <Link>
                     <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                    </Link>
                </NextLink>
                <NextLink  href='/category/women' passHref legacyBehavior>
                    <Link>
                     <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                    </Link>
                </NextLink>
                <NextLink  href='/category/kid' passHref legacyBehavior>
                    <Link>
                     <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>Ninos</Button>
                    </Link>
                </NextLink>

             </Box>

           <Box flex={1}/>
           {/* pantalla desktop */}
           {/* <IconButton>
            <SearchOutlined/>
           </IconButton> */}

              <Input 
                        autoFocus
                        value={searchTem}
                        onChange={(e)=>setSearchTem(e.target.value)}
                        onKeyPress={(e) =>e.key === 'Enter' ? onSearchTem() : null}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={onSearchTem}
                                >
                                 <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />

           {/* pantalla movil */}
           <IconButton 
             sx={{display:{xs:'flex' ,sm:'none'}}}
             onClick={toggleSideMenu}
             >
            <SearchOutlined/>
           </IconButton>

           <NextLink href={'/cart'} passHref legacyBehavior>
             <Link>
               <IconButton>
                 <Badge badgeContent={2} color='secondary'>
                 <ShoppingCartOutlined/>
                 </Badge>
               </IconButton>
             </Link>
           </NextLink>

           <Button color="info" onClick={toggleSideMenu}>MENU</Button>
        </Toolbar>
    </AppBar>
  )
}
