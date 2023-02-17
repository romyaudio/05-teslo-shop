import { useContext, useState } from "react";
import NextLink from "next/link";
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from "@mui/material"
import { ClearAllOutlined, ClearOutlined, SearchOutlined,ShoppingCartOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { UIContext } from "../../context";
import { CartContext } from '../../context/cart/';



export const Navbar = () => {

  const {toggleSideMenu} = useContext(UIContext)
  const {numberOfItems} = useContext(CartContext)
  const {asPath,push} = useRouter()
  const [searchTem, setSearchTem] = useState('')
  const [isSearchVisible, setIsSearVisible] = useState(false)

    const onSearchTem =()=>{
        if(searchTem.trim().length === 0) return
        push(`/search/${searchTem}`)
    }

    
    

  
  return (
    <AppBar>
        <Toolbar>
           <NextLink href={'/'} legacyBehavior passHref>
             <Link display='flex' alignItems='center'>
              <Typography variant="h6">Teslo |</Typography>
              <Typography sx={{ml:0.5}} >Shop</Typography>
             </Link>
           </NextLink>

           <Box flex={1} className="fadeIn"/>

             <Box sx={{display: isSearchVisible ? 'none' : {xs:'none',sm:'block'}}}>
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
           

           {
            isSearchVisible
             ? (
              <Input    
                       sx={{display:{ xs:'none',sm:'flex'}}}
                        className="fadeIn"
                        autoFocus
                        value={searchTem}
                        onChange={(e)=>setSearchTem(e.target.value)}
                        onKeyPress={(e) =>e.key === 'Enter' ? onSearchTem() : null}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={()=>setIsSearVisible(false)}
                                >
                                 <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
             ):(
             <IconButton onClick={()=>setIsSearVisible(true)} className="fadeIn" sx={{display:{ xs:'none',sm:'flex'}}}>
               <SearchOutlined/>
           </IconButton> 
             )
           }

              

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
                 <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color='secondary'>
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
