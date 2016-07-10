package ksh.main.controllers.ct;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import ksh.main.ct.dao.ConversationDao;
import ksh.main.ct.dao.MessageDao;
import ksh.main.models.ct.Conversation;
import ksh.main.models.ct.Message;

@Controller
public class ResponsesController {
	
	@RequestMapping("/ct/responses")	
	public ModelAndView goToResponses(@RequestParam("conv_id") String id) {	
		
		return new ModelAndView("/ct/responses");
	}
}