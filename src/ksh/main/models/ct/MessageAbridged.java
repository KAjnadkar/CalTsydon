package ksh.main.models.ct;

public class MessageAbridged {
	String message;
	String userName;
	Long timestamp;
	
	public MessageAbridged(String message, String userName, long timestamp){
		this.message = message;
		this.userName = userName;
		this.timestamp = timestamp;
	}
	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Long getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}	
}
