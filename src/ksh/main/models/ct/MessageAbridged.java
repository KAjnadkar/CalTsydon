package ksh.main.models.ct;

public class MessageAbridged {
	String message;
	Long timestamp;
	
	public MessageAbridged(String message, long timestamp){
		this.message = message;
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
}
