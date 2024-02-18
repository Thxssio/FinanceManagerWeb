import React, { useState, useEffect } from 'react';
import Title from './components/Title';
import Spinner from './components/Spinner';
import SelectPeriod from './components/SelectPeriod';
import Resume from './components/Resume';
import api from '../src/services/api';
import Transactions from './components/Transactions';
import AddTransaction from './components/AddTransaction';
import Filter from './components/Filter';
import CRUDModal from './components/CRUDModal';

export default function App() {
  const [allMonths, setAllMonths] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dateNow, setNewDate] = useState('2020-07');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(true);
  const [id, setId] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('/findAllMonths');
      setAllMonths(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get(`/findAll?yearMonth=${dateNow}&description=${description}`);
      setFilteredTransactions(data);
    };

    fetchData();
  }, [dateNow, description]);

  const openModal = (id, isAdding) => {
    setId(id);
    setIsAdding(isAdding);
    setIsModalOpen(true);
  };

  return (
    <>
      <CRUDModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isAdding={isAdding}
        getTransactions={() => fetchData()}
        id={id}
      />
      <div className="container">
        <div className="center">
          <h1>Bootcamp Full Stack - Desafio Final</h1>
          <Title />
        </div>
        <div className="center">
          <SelectPeriod
            items={Array.from(new Set(allMonths))}
            dateNow={dateNow}
            setNewDate={setNewDate}
          />
        </div>
        {filteredTransactions.length === 0 && <Spinner />}
        {filteredTransactions.length > 0 && (
          <div>
            <div className="resume">
              <Resume transactions={filteredTransactions} />
            </div>
            <div className="newAndSearch">
              <AddTransaction
                text="+ Novo lançamento"
                openModal={() => openModal(0, true)}
              />
              <Filter setDescription={setDescription} />
            </div>
            <Transactions
              transactions={filteredTransactions}
              openModal={openModal}
            />
          </div>
        )}
      </div>
    </>
  );
}
