import { useNavigate, useParams } from 'react-router-dom';

export const Editor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="flex flex-col items-center gap-4 pt-8">
      <h1 className="text-4xl">Editor</h1>
      <h1 className="text-4xl">Docs id: {id}</h1>
      <button
        onClick={() => navigate('/docs')}
        className="bg-black text-white p-3 rounded-xl content-center"
      >
        go back to docs
      </button>
      <button
        onClick={() => navigate('/settings')}
        className="bg-black text-white p-3 rounded-xl content-center"
      >
        go to settings
      </button>
    </div>
  );
};
