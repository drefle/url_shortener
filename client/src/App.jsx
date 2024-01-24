import { useEffect,useState } from 'react'
import axios from 'axios'
import Button from "./components/Button"
import './App.css'
 
function App() {

  const [showMenu,setShowMenu] = useState(false);

  const [value,setValue]=useState('');

  const [listUrls,setListUrls]=useState([]);

  async function getListUrls(){
    try{
      const res = await axios.get(`http://localhost:3000/getUrls`)
      setListUrls(res.data)
    } catch(error){
      console.error('Erreur dans la récupération des données: ',error);
    }
  }

  async function handleForm(e){
    e.preventDefault()
    const urlLong = e.target[0].value;
    await axios.post(`http://localhost:3000/createShortUrl`,{urlLong:urlLong})
    .then(()=>{
      getListUrls()
    })
  }

  
  //window.location.href=res.data.urlLong;

  useEffect(()=>{  
    getListUrls()
  },[])

  console.log(listUrls)



  return (
    <>
    <div className='overflow-hidden min-h-[100vh] relative h-fit flex flex-col bg-white lg:px-0'>

      <header className='font-poppins px-4'>
        <div className="relative flex flex-col items-center w-full bg-white md:flex-row md:max-w-[68rem] md:mx-auto">
          <div className='z-20 py-8 flex w-full bg-white md:mb-0 md:w-fit'>
            <a href="#" className='text-darkBlue text-4xl font-bold'><img src="./logo.svg" alt="logo de shortly" /></a>
            <button className="ml-auto md:hidden" onClick={()=>setShowMenu(!showMenu)}><img id="menu-hamburger" src="./icon-hamburger.svg" alt="logo menu" /></button>
          </div>
          <nav className={`${showMenu?"translate-y-[0]":"-translate-y-[100%]"}  absolute top-[100%] transition-all z-10 text-xl w-full bg-darkViolet rounded-xl px-6 py-10 text-white  font-bold flex flex-col md:text-gray md:text-sm md:ml-10 md:flex-row md:items-center md:bg-white md:p-0 md:relative md:z-0 md:translate-y-[0]`}>
            <div className="flex flex-col gap-8 pb-10 mb-10 border-b-[1px] border-b-grayishViolet md:flex-row md:border-none md:pb-0 md:mb-0">
              <a className='hover:text-veryDarkViolet' href="#">Features</a>
              <a className='hover:text-veryDarkViolet' href="#">Pricing</a>
              <a className='hover:text-veryDarkViolet' href="#">Resources</a>
            </div>
            <div className='gap-6 flex flex-col items-center justify-center md:ml-auto md:flex-row'>
              <a href="#" className='font-bold hover:text-veryDarkViolet md:text-sm md:mr-2'>Login</a>
              <a href="#" className='w-full bg-cyan px-5 py-2 rounded-full text-white font-bold hover:bg-[#91e8e8] hover:transition-colors md:text-sm md:w-fit'>Sign Up</a>
            </div>
          </nav>
        </div>
      </header>

      <section className='px-4 md:max-w-[70rem] md:mx-auto'>

        <div className="flex flex-col md:flex-row-reverse md:gap-10">
          <div className="w-max md:w-auto"><img className='block w-[125vw] md:w-[150%] md:max-w-fit' src="./illustration-working.svg" alt="homme qui travaille à un bureau" /></div>
          <div className="flex flex-col justify-center items-center gap-6 mt-10 md:text-left md:items-start md:mt-0">
            <h1 className='text-4xl font-poppins font-extrabold text-veryDarkBlue tracking-tighter leading-tight md:text-5xl lg:text-7xl md:leading-[1.2]'>More than just shorter links</h1>
            <p className='text-grayishViolet font-poppins text-xl lg:text-2xl md:max-w-xl md:leading-relaxed'>Build your brand's recognition and get detailed insights on how your links are performing</p>
            <button className='text-white font-poppins font-bold px-8 py-3 bg-cyan rounded-full w-fit text-xl hover:bg-[#91e8e8] hover:transition-colors lg:px-10'>Get Started</button>
          </div>
        </div>


      </section>

      <section className=' bg-[#f0f1f6] mt-40 w-full pb-40'>

      <div className='translate-y-[-5rem] px-4 md:max-w-[71rem] md:mx-auto'>
          <form onSubmit={(e)=>handleForm(e)} className='bg-darkViolet bg-shorten-mobile bg-no-repeat bg-right-top rounded-xl p-6 flex flex-col gap-4 md:flex-row md:p-14 md:bg-shorten-desktop md:bg-center md:bg-cover md:gap-6'>

            <input data-error="true" className="p-3 rounded-xl font-semibold  md:flex-grow md:py-4 md:px-8 md:text-xl" type="text" id="url" name='url' value={value} onChange={(e)=>setValue(e.target.value)} placeholder='Shorten a link here...' required />
            <button className='text-white font-poppins font-bold px-8 py-3 bg-cyan rounded-xl w-full text-xl hover:bg-[#91e8e8] hover:transition-colors md:w-fit lg:px-10'>Shorten It!</button>

          </form>

          <div className='w-full mt-4 flex flex-col gap-6'>
            {listUrls.length > 0 ? (
              listUrls.slice(-3).reverse().map((item,index)=>(
                <div key={index} className='bg-white rounded-md w-full py-6 flex flex-col justify-start items-start md:px-8 md:items-center md:flex-row'>

                  <div className="w-full  border-b-2 border-b-gray px-8 md:w-2/4 md:px-0 md:border-b-0">
                    <p className='font-poppins font-semibold text-xl text-veryDarkViolet py-4 text-start truncate'>{item.urlLong}</p>
                  </div>
                  <div className="w-full px-8 text-start md:px-0 md:flex md:text-end">
                    <a href={item.urlShort} className='font-poppins font-semibold text-xl text-cyan py-4 w-full md:ml-auto'>{item.urlShort}</a>
                    <Button
                    key={index}
                    urlShort={item.urlShort}
                  />
                  </div>

                </div>
            ))
              
            ):
            <div className='bg-white rounded-md w-full py-6 flex flex-col justify-start items-start md:px-8 md:items-center md:flex-row'>

                <div className="w-full  border-b-2 border-b-gray px-8 md:px-0 md:border-b-0">
                  <p className='font-poppins font-semibold text-xl text-veryDarkViolet py-4 text-start'>https://www.frontend-mentor.io</p>
                </div>
                <div className="w-full px-8 text-start md:px-0 md:flex md:text-end">
                  <p className='font-poppins font-semibold text-xl text-cyan py-4 w-full md:ml-auto'>https://rel.ink/k4lKyk</p>
                  <button className='font-poppins text-white font-semibold rounded bg-cyan py-2 px-6 hover:bg-[#91e8e8] w-full md:ml-6 md:w-fit md:px-10'>Copy</button>
                </div>

              </div>}
            

          </div>
        </div>

        <div className='px-6 flex flex-col justify-center items-center  lg:mt-10'>
          <h2 className='text-veryDarkViolet font-poppins font-extrabold text-[26px] lg:text-4xl'>Advanced Statistics</h2>
          <p className='text-grayishViolet mt-6 text-lg font-semibold max-w-lg lg:text-xl lg:leading-relaxed'>Track how your links are performing across the web with our advanced statistics dashboard.</p>
        </div>

        <div className='flex flex-col gap-24 px-6 mt-20 justify-center items-center lg:flex-row lg:max-w-[71rem] lg:mx-auto lg:gap-8'>

          <div className='relative flex flex-col justify-center items-center gap-6 px-8 pt-20 pb-10 bg-white rounded-lg max-w-[310px] lg:items-start lg:text-left lg:max-w-none lg:translate-y-[-20%]'>

            <div className='absolute top-0 translate-y-[-50%] flex justify-center items-center bg-darkViolet rounded-full w-fit p-5'>
              <img src="./icon-brand-recognition.svg" alt="brand recognition" />
            </div>

            <h3 className='text-xl font-extrabold font-poppins text-darkViolet'>Brand Recognition</h3>
            <p className='text-base font-poppins font-medium text-grayishViolet'>Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instil confidence in your content.</p>

          </div>

          <div className='relative flex flex-col justify-center items-center gap-6 px-8 pt-20 pb-10 bg-white rounded-lg max-w-[310px] before:absolute before:top-0 before:translate-y-[-100%] before:h-24 before:w-2 before:bg-cyan after:absolute after:bottom-0 after:translate-y-[100%] after:h-24 after:w-2 after:bg-cyan lg:items-start lg:text-left lg:max-w-none lg:before:left-0 lg:before:top-[40%] lg:before:translate-y-0 lg:before:h-2 lg:before:w-8 lg:before:translate-x-[-100%] lg:after:right-0 lg:after:top-[40%] lg:after:translate-y-0 lg:after:h-2 lg:after:w-8 lg:after:translate-x-[100%]'>

            <div className='absolute top-0 translate-y-[-50%] flex justify-center items-center bg-darkViolet rounded-full w-fit p-5'>
              <img src="./icon-detailed-records.svg" alt="brand recognition" />
            </div>

            <h3 className='text-xl font-extrabold font-poppins text-darkViolet'>Detailed Records</h3>
            <p className='text-base font-poppins font-medium text-grayishViolet'>Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.</p>

          </div>

          <div className='relative flex flex-col justify-center items-center gap-6 px-8 pt-20 pb-10 bg-white rounded-lg max-w-[310px] lg:items-start lg:text-left lg:max-w-none lg:translate-y-[20%]'>

            <div className='absolute top-0 translate-y-[-50%] flex justify-center items-center bg-darkViolet rounded-full w-fit p-5'>
              <img src="./icon-fully-customizable.svg" alt="brand recognition" />
            </div>

            <h3 className='text-xl font-extrabold font-poppins text-darkViolet'>Fully Customizable</h3>
            <p className='text-base font-poppins font-medium text-grayishViolet'>Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.</p>

          </div>

        </div>

      </section>

      <section className='flex flex-col gap-6 justify-center items-center bg-darkViolet bg-boost-mobile bg-no-repeat bg-cover bg-right-top py-24 md:bg-boost-desktop'>
        <h2 className='text-white font-poppins font-bold text-3xl lg:text-[40px]'>Boost your links today</h2>
        <button className='text-white font-poppins font-bold px-10 py-3 bg-cyan rounded-full w-fit text-xl hover:bg-[#91e8e8] hover:transition-colors lg:px-10'>Get Started</button>
      </section>

      <footer className='bg-veryDarkViolet '>

        <div className='flex flex-col justify-center items-center py-14 px-6 max-w-[71rem] mx-auto md:flex-row md:items-start'>
          <h2 className='text-white font-poppins font-bold text-4xl '>Shortly</h2>
          <div className='flex flex-col justify-center items-center gap-10 mt-10 md:flex-row lg:gap-24 md:items-start md:mt-0 md:ml-auto'>
            <div className='flex flex-col gap-2 md:items-start'>
              <h3 className='text-white font-poppins font-semibold mb-4'>Features</h3>
              <a className='font-poppins text-grayishViolet font-semibold hover:text-cyan' href="#">Link Shortening</a>
              <a className='font-poppins text-grayishViolet font-semibold hover:text-cyan' href="#">Branded Links</a>
              <a className='font-poppins text-grayishViolet font-semibold hover:text-cyan' href="#">Analytics</a>
            </div>
            <div className='flex flex-col gap-2 md:items-start'>
              <h3 className='text-white font-poppins font-semibold mb-4'>Resources</h3>
              <a className='font-poppins text-grayishViolet font-semibold hover:text-cyan' href="#">Blog</a>
              <a className='font-poppins text-grayishViolet font-semibold hover:text-cyan' href="#">Developers</a>
              <a className='font-poppins text-grayishViolet font-semibold hover:text-cyan' href="#">Support</a>
            </div>
            <div className='flex flex-col gap-2 md:items-start'>
              <h3 className='text-white font-poppins font-semibold mb-4'>Features</h3>
              <a className='font-poppins text-grayishViolet font-semibold hover:text-cyan' href="#">About</a>
              <a className='font-poppins text-grayishViolet font-semibold hover:text-cyan' href="#">Our Team</a>
              <a className='font-poppins text-grayishViolet font-semibold hover:text-cyan' href="#">Careers</a>
              <a className='font-poppins text-grayishViolet font-semibold hover:text-cyan' href="#">Contact</a>
            </div>
            <div className='flex justify-center items-center gap-6'>
              <a href="#"><svg className='fill-white hover:fill-cyan' xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path  d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg></a>
              <a href="#"><svg className='fill-white hover:fill-cyan' xmlns="http://www.w3.org/2000/svg" width="24" height="20"><path d="M24 2.557a9.83 9.83 0 01-2.828.775A4.932 4.932 0 0023.337.608a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616.248c-3.179 0-5.515 2.966-4.797 6.045A13.978 13.978 0 011.671 1.149a4.93 4.93 0 001.523 6.574 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.935 4.935 0 01-2.224.084 4.928 4.928 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.548 2.212c9.142 0 14.307-7.721 13.995-14.646A10.025 10.025 0 0024 2.557z"/></svg></a>
              <a href="#"><svg className='fill-white hover:fill-cyan' xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg></a>
              <a href="#"><svg className='fill-white hover:fill-cyan' xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
            </div>
          
          </div>
        </div>

      </footer>


    </div>
    
      
    </>
  )
}

export default App
