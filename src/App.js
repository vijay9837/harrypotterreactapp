import { useEffect, useState } from "react"
import { FadeLoader } from 'react-spinners'
import "./App.css"

function App() {
  const [search, setSearch] = useState("")
  const [spells, setSpells] = useState("")
  const [charcter, setCharacter] = useState("")
  const [books, setBooks] = useState("")
  const [house,setHouses] = useState("")
  const [displaychar, setDisplaychar] = useState(false)
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  useEffect(() => {

    const fetchdata = async () => {
      try {
        const charres = await fetch("https://potterapi-fedeperin.vercel.app/en/characters")
        const chardata = await charres.json()
        console.log(chardata)
        if (chardata) {
          setError("")
          setSearch(chardata)
        }
      }
      catch (error) {
        setError("API Error")
        console.log(error)
      }
    }
    fetchdata()
  }, [])

  const handlechange = async (e) => {
    setDisplaychar(true)
    try {
      setLoading(true)
      const charres = await fetch("https://potterapi-fedeperin.vercel.app/en/characters")
      const chardata = await charres.json()
      const spellres = await fetch("https://potterapi-fedeperin.vercel.app/en/spells")
      const spelldata = await spellres.json()
      const bookres = await fetch("https://potterapi-fedeperin.vercel.app/en/books")
      const bookdata = await bookres.json()
      const houseres = await fetch("https://potterapi-fedeperin.vercel.app/en/houses")
      const housedata = await houseres.json()
      console.log(housedata)
      setBooks(bookdata)
      setHouses(housedata)
      const searchedchar = chardata.find((f) => Number(f.index) === Number(e.target.value))
      setSpells(spelldata)
      setLoading(false)
      setCharacter(searchedchar)
    } catch (error) {
      console.log(error)
    }
  }

  const getRandomSpells = (n = 3) => {
    if (!spells.length) return [];
    const shuffled = [...spells].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };
  const getRandomBooks = (n = 3) => {
    if (!books.length) return [];
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };
  const getRandomHouses = (n = 3) => {
    if (!house.length) return [];
    const shuffled = [...house].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  return (
    <div className=" vw-100 min-vh-100 vh-100 main-wrapper">
      <h1 class="text-primary text-center w-100 ">Harry Potter App</h1>
      <div class="w-50 searchbox mx-auto d-flex align-items-center gap-lg-3 justify-content-center bg-success rounded-3 ">
        <label class="fs-4 text-light">Select Harrypoter : </label>
        <select class="border-0 p-lg-3 bg-transparent fs-4 text-light " onChange={handlechange}>
          <option class="text-black">---</option>
          {error ? "whjgfjh" : search ?
            search.map((c) => {
              return <option class="text-black" value={c.index}>{c.fullName}</option>
            }) : ""}
        </select>
      </div>
      {loading ? <div class="d-flex w-100 justify-content-center h-75 align-items-center "><FadeLoader color="#37e6bb" margin={16} height={32} width={7} /></div> : displaychar ?
        <div class=" h-75 w-80 rounded-4 mx-auto my-2 ">
          <div class="w-100 h-100 d-flex flex-wrap align-items-center justify-content-center bg-white rounded-4 p-lg-3 p-2 gap-2 ">
            <img src={charcter.image} class=" rounded-4 charater-image shadow border border-primary  " />
            <div class=" col-lg-10 col-12  border  shadow  border-1 border-primary  d-flex flex-column  p-lg-3 p-2 rounded-4">
              <p class=" personal-details-text m-lg-2 m-1">Name : {charcter.fullName}</p>
              <p class=" personal-details-text m-lg-2 m-1">Hogwarts House : {charcter.hogwartsHouse}</p>
              <p class=" personal-details-text m-lg-2 m-1">BirthDate : {charcter.birthdate}</p>
              <p class=" personal-details-text m-lg-2 m-1">Interpretedby : {charcter.interpretedBy}</p>
            </div>
            <div class=" col-12 p-2 ">
              <div className="row ">
                <h3 class="bg-success p-1 fs-4 w-100 text-white  rounded-2">Spells</h3>
                {getRandomSpells(3).map((spell, i) => (
                  <div className="col-md-4 h-100 mb-3 p-2" key={i}>
                    <div className="card border-success h-100">
                      <div className=" p-lg-2 p-1 ">
                        <h5 className="card-title text-success fs-2">
                          {spell.spell || spell.name}
                        </h5>
                        <p class="fs-5">{spell.use || spell.description || "No description"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row ">
                <h3 class="bg-warning p-1 fs-4 w-100 text-white  rounded-2">Books</h3>
                {getRandomBooks(3).map((book, i) => (
                  <div className="col-md-4 h-100 mb-3 p-2" key={i}>
                    <div className="card border-success h-100">
                      <div className=" p-lg-2 p-1 row  align-items-center ">
                        <img class="bookimg col-3" src={book.cover}/>
                        <h5 className="card-title text-success fs-2 col-9">
                          {book.title || book.name}
                        </h5>
                        <p class="fs-5 col-12 text-center">{book.description || book.use || "No description"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row ">
                <h3 class="bg-danger p-1 fs-4 w-100 text-white  rounded-2">Houses</h3>
                {getRandomHouses(3).map((house, i) => (
                  <div className="col-md-4 h-100 mb-3 p-2" key={i}>
                    <div className="card border-success h-100">
                      <div className=" p-lg-2 p-1 row  align-items-center ">
                        <h1 class="text-danger fw-medium fs-4">{house.emoji}:{house.house}</h1>
                        <p className="card-title text-danger fs-4 col-9">
                          {house.animal || ""} 
                        </p>
                        <p class="fs-5 col-12 text-danger ">{house.founder || "" || "No description"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
        :
        <div class="w-50 mx-auto my-2"><h2 class="q w-100 text-center text-danger p-2 border border-danger rounded-3 bg-danger-subtle ">Select a Character To see Details</h2></div>}
    </div>
  )
}

export default App