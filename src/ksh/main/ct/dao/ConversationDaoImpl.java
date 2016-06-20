package ksh.main.ct.dao;

import java.util.ArrayList;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import ksh.main.models.ct.Conversation;

@Repository("conversationDao")
public class ConversationDaoImpl implements ConversationDao {
	
	@Autowired
    private SessionFactory sessionFactory;
	
	public ConversationDaoImpl(){	     
	}
	     
	public ConversationDaoImpl(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	 

	@Override	
	@Transactional
	public void saveConversation(Conversation c) {
		sessionFactory.getCurrentSession().saveOrUpdate(c);
	}

	@Override	
	@Transactional
	public Conversation findConversation(long id) {
		return new Conversation("afasfasfsa", new ArrayList<String>());		
	}

}
