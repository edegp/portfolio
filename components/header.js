import Link from 'next/link'
import ContentfulImage from './contentful-image'
import logo from '../public/logo.jpg'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const image = (
    <ContentfulImage
      width={200} 
      height={50}
      objectFit='cover'
      alt='logo'
      src={logo}
    />
  )
  function slideMenu() {
    
  }
  return (
    <>
      <header>
        <section className="header-nav">
          <IconButton onClick={slideMenu()}><MenuIcon /></IconButton>
          <div className="header-logo">
            <Link href="/">
              <a className="hover:underline">
                {image}
              </a>
            </Link>
          </div>
          <nav className="nav">
            <Button>about</Button>
            <Button>blog</Button>
            <Button>contact</Button>
          </nav>
        </section>
        <div className="header-shadow"></div>
        <div className="none slide-menu">
          <div className="menu-back"></div>
          <div className="slide-menu-nav">
            <div className="slide-menu-container">
              <div className="slide-logo">
                <Link href="/">
                  <a className="hover:underline">
                    {image}
                  </a>
                </Link>
              </div>
              <nav className="slide-nav">
                <Button>about</Button>
                <Button>blog</Button>
                <Button>contact</Button>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
    )
}
