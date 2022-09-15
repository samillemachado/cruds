import Pessoa from "./pessoa";

interface Aluno extends Pessoa {
  matricula: number;
  cursando: boolean;
  aprovado: boolean;
}

export default Aluno;
