package ksh.main.ct.dao;

import java.util.ArrayList;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import ksh.main.models.ct.Message;

public class MessageDaoImpl implements MessageDao {
	
	@Autowired
    private SessionFactory sessionFactory;
	
	public MessageDaoImpl(){
		
	}
	
	public MessageDaoImpl(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}

	@Override	
	@Transactional
	public void saveMessage(Message m) {
		sessionFactory.getCurrentSession().saveOrUpdate(m);		
	}

	@Override
	public ArrayList<Message> getMessagesForConverationId(String id) {
		// TODO Auto-generated method stub
		return null;
	}

}
