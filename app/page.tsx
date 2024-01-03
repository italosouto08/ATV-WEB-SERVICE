"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { api } from "./services/index";


export default function Home() {

  const [user, setUser] = useState([]);


  //GET
  useEffect(() => {
    api.get("http://localhost:5555/users").then((response) => {
      setUser(response.data);
    }) 
  }, []);


  //POST
  const addUser = () => {
    const userNome = document.getElementById("userNome") as HTMLInputElement
    const userIdade = document.getElementById("userIdade") as HTMLInputElement
    const userTime = document.getElementById("userTime") as HTMLInputElement

    const newUser = {
      nome: userNome.value,
      idade: userIdade.value,
      time: userTime.value
    }

    if(userNome.value == "" || userIdade.value == "" || userTime.value == ""){
      alert("Por favor preencha todos os campos.")
    }else{
      api.post("http://localhost:5555/users", newUser).then((response) => {
        setUser([...user,response.data])
      })
    }
  };

  //DELETE
  const deleteUser = async (id:any) => {
    await api.delete(`http://localhost:5555/users/${id}`)
  }


  //PUT 
  const updatedUser = async  (id:any) => {
    const updatedNome = document.getElementById (`updatedNome${id}`) as HTMLInputElement;
    const updatedIdade = document.getElementById (`updatedIdade${id}`) as HTMLInputElement;
    const updatedTime = document.getElementById (`updatedTime${id}`) as HTMLInputElement;

    const updatedUser = {
      nome: updatedNome.value,
      idade: updatedIdade.value,
      time: updatedTime.value
    };

    await axios.put(`http://localhost:5555/users/${id}`, updatedUser)
    const newUser = user.filter((user:any) => user.id !== id)
    setUser(newUser);
  }

  return ( 
    <main className="container mx-auto px-4">
    <div>
      <h1 className="text-4xl font-bold mb-5 text-center">Usuários</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-500 px-4 py-2">Nome</th>
            <th className="border border-gray-500 px-4 py-2">Idade</th>
            <th className="border border-gray-500 px-4 py-2">Time de coração</th>
            <th className="border border-gray-500 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user: any) => {
            return (
              <tr key={user.id}>
               <td className="border border-gray-500 px-4 py-2">
                  {user.nome} <input type="text" id={`updatedNome${user.id}`} className="text-black" />
               </td>
               <td className="border border-gray-500 px-4 py-2">
                  {user.idade} <input type="number" id={`updatedIdade${user.id}`} className="text-black" />
               </td>
               <td className="border border-gray-500 px-4 py-2">
                  {user.time} <input type="text" id={`updatedTime${user.id}`} className="text-black" />
               </td>
               <td className="border border-gray-500 px-4 py-2">
                  <button onClick={() => updatedUser(user.id)}>Atualizar</button>
                  <span> | </span>
                  <button onClick={() => deleteUser(user.id)}>Deletar</button>
               </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div>
      <input type="text" id="userNome" className="border border-gray-500 px-4 py-2 text-black" />
      <input type="number" id="userIdade" className="border border-gray-500 px-4 py-2 text-black" />
      <input type="text" id="userTime" className="border border-gray-500 px-4 py-2 text-black" />
      <button onClick={addUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Adicionar Usuário
      </button>
    </div>
  </main>
);
}
