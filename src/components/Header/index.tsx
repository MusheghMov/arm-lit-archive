import { LibraryBig, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ModeToggle } from "@/components/ModeToggle";
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { db } from '@/db';
// import { user } from '@/db/schema';

export default function Header() {
  // console.log('user', user);
  // const { setTheme, theme } = useTheme();
  // const formSchema = z.object({
  //   search: z.string()
  // });
  // const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     search: ''
  //   }
  // });
  //
  // function onSubmitSearchForm(data: z.infer<typeof formSchema>) {
  //   console.log(data);
  // }

  // async function onCreateTestUser() {
  //   const result = await db
  //     .insert(user)
  //     .values({ name: 'mushegh', email: 'email' });
  //   console.log('result', result);
  // }
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center space-x-2">
        <LibraryBig className="min-h-6 min-w-6" />
        <h2 className="hidden text-base font-bold sm:block">
          Armenian Literature Archive
        </h2>
      </div>

      <div className="hidden flex-row items-center space-x-4 lg:flex">
        <Button variant="link" className="text-black dark:text-white">
          Home
        </Button>
        <Button variant="link" className="text-black dark:text-white">
          Authors
        </Button>
        <Button variant="link" className="text-black dark:text-white">
          Books
        </Button>
        <Button variant="link" className="text-black dark:text-white">
          Categories
        </Button>
      </div>

      <div className="hidden flex-row items-center space-x-4 lg:flex">
        <form>
          <Input placeholder="Search" className="hidden h-full sm:block" />
        </form>

        <ModeToggle />
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
// ssName="text-black dark:text-white"
//         >
//           Home
//         </Button>
//         <Button variant="link" className="text-black dark:text-white">
//           Authors
//         </Button>
//         <Button variant="link" className="text-black dark:text-white">
//           Books
//         </Button>
//         <Button variant="link" className="text-black dark:text-white">
//           Categories
//         </Button>
//       </div>
//       <div className="flex flex-row items-center space-x-4">
//         <form onSubmit={handleSubmit(onSubmitSearchForm)}>
//           <Input
//             {...register('search')}
//             placeholder="Search"
//             className="hidden h-full sm:block"
//           />
//         </form>
//         <Button
//           className="h-8 w-8 p-2"
//           onClick={()
