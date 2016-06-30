package ksh.main.models.ct;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "CONVERSATIONS")
public class Conversation {
	
	@Id    
    @Column(name = "conv_id")	
	String id;	
	
	String topic;	
	
	String accessKey;
	
	public Conversation(String id, String topic) {
		this.id = id;
		this.topic = topic;
		this.accessKey = "key";
	}
	
	public String getKey() {
		return accessKey;
	}

	public void setKey(String key) {
		this.accessKey = key;
	}

	public String getId() {
		return id;
	}	
	
	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public void setId(String id) {
		this.id = id;
	}	
}
